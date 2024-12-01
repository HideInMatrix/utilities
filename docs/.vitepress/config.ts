// .vitepress/config.js
import type { DefaultTheme } from "vitepress";
import { basename } from "node:path";
import fg from "fast-glob";

function copyright() {
  const start = 2023;
  const now = new Date().getFullYear();
  const year = now === start ? "2023" : `${start}-${now}`;

  return `Copyright © ${year} MicroMatrix. All rights reserved.`;
}

interface IndexTree {
  [index: string]: {
    link: string;
    items?: IndexTree;
    order?: number;
  };
}

function resolveTitle(title: string) {
  const segments = title.split("/");
  title = segments[segments.length - 1]; // Only take the last segment
  title = title.charAt(0).toUpperCase() + title.slice(1);

  return title;
}

function getOrder(name: string) {
  const configItem = orderConfig.find((item) => item.name === name);
  return configItem ? configItem.order : 100; // 默认顺序为 100，如果未找到配置则使用默认
}

function getTree(file: string, prefix: string, tree = {}) {
  const [cur, ...rest] = file.replace(".md", "").split("/");
  const isIndex = cur === "index";
  const curPath = isIndex ? prefix.slice(0, -1) : prefix + cur;

  if (curPath) {
    if (!tree[curPath]) {
      tree[curPath] = {
        link: isIndex ? `/${prefix.slice(0, -1)}` : `/${prefix + cur}`,
        order: getOrder(cur), // 从配置中获取顺序
      };
    }
    if (rest.length > 0) {
      if (!tree[curPath].items) {
        tree[curPath].items = {};
      }
      getTree(rest.join("/"), `${curPath}/`, tree[curPath].items);
    }
  }
}

function treeToItems(tree: IndexTree) {
  const items: DefaultTheme.SidebarItem[] = [];
  Object.keys(tree)
    .sort((a, b) => {
      const orderA = tree[a].order ?? 100;
      const orderB = tree[b].order ?? 100;
      return orderA - orderB; // 根据 order 进行升序排序
    })
    .forEach((key) => {
      if (key) {
        const item: DefaultTheme.SidebarItem = {
          text: resolveTitle(key),
          link: tree[key].link,
          collapsed: true, // Start collapsed by default
        };
        if (tree[key].items) {
          item.items = treeToItems(tree[key].items!).filter(
            (subItem) => subItem.text !== item.text
          );
        }
        items.push(item);
      }
    });

  return items;
}

// Example orderConfig
const orderConfig = [{ name: "introduction", order: 1 }];

const tree = fg
  .sync(["./docs/**/*.md"])
  .map((path) => path.replace("./docs/", ""))
  .reduce((tree, file) => {
    getTree(file, "", tree);
    return tree;
  }, {});

const docs: DefaultTheme.SidebarItem[] = treeToItems(tree);

export default {
  // 站点级选项
  title: "MicroMatrix Utilities",
  description: "个人前端常用函数",

  themeConfig: {
    // 主题级选项
    nav: [
      { text: "Home", link: "/" },
      { text: "API", link: "/introduction/" },
    ],
    sidebar: docs,
    search: { provider: "local" },
    footer: {
      message: "Released under the MIT License.",
      copyright: copyright(),
    },
  },
  sitemap: {
    hostname: "https://utilities.micromatrix.org",
  },
  markdown: {
    theme: {
      light: "light-plus",
      dark: "github-dark",
    },
  },
};
