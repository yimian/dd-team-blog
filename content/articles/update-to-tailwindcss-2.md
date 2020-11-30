---
title: 升级至 Tailwind CSS 2.0
description: 此次的更新值得关注的是什么？以及更新之后应该做什么工作？
img: update-to-tailwindcss-2.png
alt: Update to TailwindCSS v2.0
author:
  name: Franco
  bio: Web Designer
  image: avatar.img
---

## 关注点

### 调色板

这次更新关于调色板的主要更新在于：

- 新增一个额外的调色板 `50`，如 `bg-gray-50`
- 优化所有调色板

由于我们并没有使用 Tailwind CSS 的原生调色板，而是完全自定义。故此次关于调色板的更新我们可以直接跳过。

### 深色模式

由于苹果系统内置的深色模式引发对深色模式的广泛应用后，Tailwind Lab 认为是时候对这一特性提供支持。

#### 配置

默认不使用，如需使用该特性，需要在 `tailwind.config.js` 中进行配置：

```js
// tailwind.config.js
module.exports = {
  darkMode: 'media',
}
```

#### 使用方式

为通用类添加 `dark` 前缀：

```html
<div class="bg-white dark:bg-gray-800">Example</div>
```

#### 原理

利用 CSS 媒体查询特性 `prefers-color-scheme`，监测当前系统请求的颜色主题（light 或 dark）：

```css
@media (prefers-color-scheme: dark) {
	.dark\:bg-gray-800 { background-color: var(--color-gray-800) };
}
```

### 新增 2xl 断点

**随着设备屏幕尺寸越来越大**，用户对更大的断点需求越发旺盛，故 tailwind css 为用户默认新增屏幕宽度为 1536px 的断点，并命名前缀 2xl：

```html
<h1 class="2xl:text-9xl">Godzilla</h1>
```

| Breakpoint prefix | Minimum width | CSS                                  |
|-------------------|---------------|--------------------------------------|
| `sm`              | 640px         | `@media (min-width: 640px) { ... }`  |
| `md`              | 768px         | `@media (min-width: 768px) { ... }`  |
| `lg`              | 1024px        | `@media (min-width: 1024px) { ... }` |
| `xl`              | 1280px        | `@media (min-width: 1280px) { ... }` |
| `2xl (NEW)`       | 1536px        | `@media (min-width: 1536px) { ... }` |

### 创建轮廓的新通用类 `ring`

此类主要应用于**自定义聚焦状态的样式**。旧版本是通过自定义 `outline` 属性来实现的，但是由于 `outline` 属性会忽略 `border-radius` ，所以就有了 `ring`。

`ring` 实际上是用 `box-shadow` 模拟 `outline` 的样式，但是比起 `outline`，它更加可控。

<div class="grid grid-cols-1 gap-6 p-8 overflow-hidden rounded-xl bg-blue-50 sm:grid-cols-4 justify-items-center">
  <button tabindex="-1" class="w-24 py-3 text-sm font-semibold text-white bg-blue-500 rounded-md focus:outline-none ring-0">
    ring-0
  </button>
  <button tabindex="-1" class="w-24 py-3 text-sm font-semibold text-white bg-blue-500 rounded-md focus:outline-none ring-2">
    ring-2
  </button>
  <button tabindex="-1" class="w-24 py-3 text-sm font-semibold text-white bg-blue-500 rounded-md focus:outline-none ring">
    ring
  </button>
  <button tabindex="-1" class="w-24 py-3 text-sm font-semibold text-white bg-blue-500 rounded-md focus:outline-none ring-4">
    ring-4
  </button>
</div>

```html
<button class="... ring-0">ring-0</button>
<button class="... ring-2">ring-2</button>
<button class="... ring">ring</button>
<button class="... ring-4">ring-4</button>
```

### 友好的实用型表格样式

由于 Taiwind Lab 发现用户经常抱怨表单元素的默认样式丑陋，并且容易引发一些边缘情况的问题，所以他们此次发布了 `@tailwindcss/forms` 插件，用于重置所有基础表单样式，并让表单在所有浏览器的表现保持一致。

由于我们已经使用第三方库，并且已经内置了表单样式，引入此插件易发生样式紊乱的情况，故我们在此可以跳过。

**如果我们开始一个新的项目，并且不使用其他第三方样式组件库**，我们则可以使用它，我相信这个插件可以节省我们不少时间：

首先我们需要安装这个插件：

```
yarn add @tailwindcss/forms
```

随后在 `tailwind.config.js` 中添加插件即可：

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
```

### 为每个 font-size 设置默认 line-height

`1.x` 版本的 TailwindCSS 中，`text-xx` 仅定义文本大小，`line-height` 需要通过 `leading-xx` 额外调整（或继承于父级，通常为 `body` ）。此次更新中，Tailwind 为每一个字号设置一个有意义的 `line-height` 。

我的观点：这些 `line-height` 的默认值将对拉丁语言界面表现良好，而亚洲语言的话，应需要额外增加一些 `line-height`，故在这里我们极有可能需要做额外的配置。

### 拓展留白、排版和透明度的范围

如，ml-0.5 表示 margin-left: 2px， ml-1.5 表示 margin-left: 6px 等等；可选的细粒度更多。

### 现在所有 class 都能放入 `apply`

无论是状态类（如 focus hover active...）、响应式类（sm md lg...）；这意味着我们可以剪切 vue 文件中的 class，并直接粘贴至 css 文件中，不需要做额外的工作。

以前：

```css
.btn {
	@apply text-sm;

	&:focus {
		@apply text-lg;
	}

	@screen lg {
		@apply text-xl;
	}
}
```

现在：

```css
.btn {
	@apply text-sm focus:text-lg lg:text-xl;
}
```

### 新的文本溢出实用类

在此前，Tailwind 仅支持单行文本隔断：

<div class="p-10 overflow-hidden rounded-xl bg-indigo-50">
  <p class="max-w-xs px-6 py-4 mx-auto font-medium text-indigo-500 truncate bg-indigo-200 rounded-lg">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiisitaquequodpraesentiumexplicaboincidunt? Dolores beatae nam at sed dolorum ratione dolorem nisi velit cum.
  </p>
</div>

```html
<p class="overflow-ellipsis overflow-hidden ...">...</p>
```

现在，可以支持多行文本中，某一行不规则（非正常词汇）文本的隔断或裁剪。我们可能会用到的一个场景是，一段文本里面包含了一条很长的 url，而我们不喜欢这个 url 换行，而是截断或裁剪。

<div class="p-10 overflow-hidden rounded-xl bg-indigo-50">
  <p class="max-w-xs px-6 py-4 mx-auto my-0 overflow-hidden font-medium text-indigo-500 bg-indigo-200 rounded-lg overflow-ellipsis">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiisitaquequodpraesentiumexplicaboincidunt? Dolores beatae nam at sed dolorum ratione dolorem nisi velit cum.
  </p>
</div>

```html
<p class="overflow-ellipsis overflow-hidden ...">...</p>
```

<div class="p-10 overflow-hidden rounded-t-xl bg-indigo-50">
  <p class="max-w-xs px-6 py-4 mx-auto my-0 overflow-hidden font-medium text-indigo-500 bg-indigo-200 rounded-lg overflow-clip">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiisitaquequodpraesentiumexplicaboincidunt? Dolores beatae nam at sed dolorum ratione dolorem nisi velit cum.
  </p>
</div>

```html
<p class="overflow-clip overflow-hidden ...">...</p>
```

### 拓展 variant

在此前，如果我们要为某一个 variant（如 `backgroundColor`）拓展新的功能，如 `focus-visible`，写法是：

```js
// tailwind.config.js
module.exports = {
  // ...
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'focus-visible'],
  },
}
```

这里的问题是，我们在拓展新的功能时，也必须把默认的功能写上，如 `responsive` `hover` `focus`，2.0 之后，我们只需要通过 `extend`，可以只写 `focus-visible` ，它会自动合并到默认配置中：

```js
// tailwind.config.js
module.exports = {
  // ...
  variants: {
    extend: {
			backgroundColor: ['focus-visible'],
		},
  },
}
```

### 默认使用 `group-hover` 和 `focus-whthin`

在此前，如果想要为某一个类使用 `group-hover` 和 `focus-whthin` 的功能，是需要到配置项进行拓展的，现在已默认使用，无需手动添加拓展：

```html
<div class="group ...">
  <span class="group-hover:text-blue-600 ...">Da ba dee da ba daa</span>
</div>
```

### 提供默认的 transition duration 和 easing curve

此前要添加一个过渡，我们必须要添加三个类，为别为 `transition`，`duration-xxx` 和 `ease-xxx`：

```html
<button class="... transition duration-150 ease-in-out">Count them</button>
```

2.0 之后，Tailwind 已为最常用的过渡添加为默认设置：

```js
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    // ...
    transitionDuration: {
      DEFAULT: '150ms',
      // ...
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // ...
    },
  },
}
```

现在我们只需要添加 transition 的类，已设置为默认的 transition-duration 和 transition-time-function 的值会同时应用，所以，写法简写为：

```html
<button class="... transition">Count them again</button>
```

## 升级工作

### 将主题关键词 `default` 修改为 `DEFAULT`

在 `tailwind.config.js` 配置文件中，将关键词 `default` 修改为 `DEFAULT`。在 2.0 之后，小写的 `default` 生成出来的类将是 `xxx-default` 而不是 `xxx`。

将会生成 `rounded-default`，而不是预期的 `rounded`：

```js
// tailwind.config.js
module.exports = {
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
    },
  }
}
```

将会生成 `rounded`：

```js
// tailwind.config.js
module.exports = {
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
    },
  }
}
```

### 重命名部分实用型类名

在 VS Code 中，全局搜索 `Shift + Command + F`，修改以下类名：

| 搜索                 | 替换                |
|----------------------|---------------------|
| `whitespace-no-wrap` | `whitespace-nowrap` |
| `flex-no-wrap`       | `flex-nowrap`       |
| `col-gap-{n}`        | `gap-x-{n}`         |
| `row-gap-{n}`        | `gap-y-{n}`         |

### 配置 fontSize

Tailwind CSS v2.0 的 `fontSize` 已经包含了默认的 `line-height`，如果项目中的 `tailwind.config.js` 包含以下配置，则无需做任何处理：

```js
// tailwind.config.js
module.exports = {
  future: {
    defaultLineHeights: true,
  },
  // ...
}
```

如果没有上述配置，则可以通过覆盖配置或手动修复的方式使得已有项目的排版不受影响：

#### 覆盖配置

最快的方式是使用 v1 的 `fontSize` 的相关配置进行覆盖：

```js
// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
  }
}
```

#### 手动修复

在使用了 `text-xx` 类的元素中，如果没有使用行高的类，则可以使用 `leading-normal`，将该元素的行高设置为默认行高。