# Devkit Base Components

**Devkit Base Components** (also known as *vue-devkit*) is a collection of reusable, high-quality Vue.js components that streamline your development workflow. Built as headless components, this library provides maximum flexibility and control over styling and integration in your projects.

The package consists of two main parts:

- **Plugin Code:** Located in the `devkit-base-components/src` folder, which exports components and helper functions.
- **Documentation Site:** Located in the `docs` folder. This is a Vue project that demonstrates and documents how to use the plugin in real-world scenarios.

> **Note:** This package depends on several peer dependencies such as Vue 3, PrimeVue, TailwindCSS, and more. Please review the [Peer Dependencies](#peer-dependencies) section below.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Plugin Installation](#plugin-installation)
  - [Using the Components](#using-the-components)
- [Components Documentation](#components-documentation)
  - [AppBtn](#appbtn)
  - [AppImage](#appimage)
  - [AppIcon](#appicon)
  - [AppSection](#appsection)
  - [AppHeader](#appheader)
  - [AppLocaleToggler](#applocaletoggler)
- [Helpers & Configuration](#helpers--configuration)
- [Development](#development)
- [Contributing](#contributing)
- [Peer Dependencies](#peer-dependencies)
- [License](#license)

---

## Installation

Install the package using npm or yarn:

```bash
npm install devkit-base-components
# or
yarn add devkit-base-components
```

---

## Usage

### Plugin Installation

To integrate the plugin into your Vue project, import and install it along with any required configuration. For example:

```js
// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createI18n } from 'vue-i18n';
import router from './routes';
import DevkitBaseComponentsPlugin, { setupI18nSync, type DevkitBaseConfig } from 'devkit-base-components';
import { apiClient } from './api/apiClient';
import 'devkit-base-components/style';
import './assets/css/app.css';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: { hello: "Hello" },
    ar: { hello: "اهلا" }
  }
});

const baseConfig: DevkitBaseConfig<typeof apiClient> = {
  apiClient,
  locales: ['en', 'ar'],
  iconFindApi: 'iconFind' // Can also be a function or a promise-based endpoint.
};

const app = createApp(App);

app.use(PrimeVue, { theme: 'none' });
app.use(i18n);
app.use(router);
app.use(DevkitBaseComponentsPlugin, baseConfig);

// Optionally, call setupI18nSync() inside your component's setup() to sync locale settings:
// setup() {
//   setupI18nSync();
// }

app.mount('#app');
```

### Using the Components

After installing the plugin, some components are registered globally while others can be imported as needed. For example:

```html
<template>
  <div>
    <!-- Global components (registered via the plugin) -->
    <AppImage src="path/to/image.jpg" alt="Example Image" />
    <AppIcon icon="home" size="medium" iconType="primevue" color="#333" />
    <AppBtn :action="() => handleClick()" label="Click Me" />

    <!-- Components imported locally -->
    <AppSection sectionName="Section Title" sectionDescription="This is a section." :dark="false" :narrow="true" :center="true">
      <p>Your content here...</p>
    </AppSection>
  </div>
</template>

<script setup>
import { AppHeader, AppSection, AppLocaleToggler } from 'devkit-base-components';

function handleClick() {
  console.log("Button clicked!");
}
</script>
```

---

## Components Documentation

### AppBtn

A versatile button component that can act as a clickable button, a router link, or an external link depending on the provided `action`.

#### Props

| Prop      | Type                         | Description                                                                                                                                  | Default      |
| --------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `action`  | `string` or `Function`       | Either a function (click handler) or a link (URL or route string). If a string starts with `http`, an anchor (`<a>`) element is rendered; otherwise, a `<RouterLink>` is used. | **Required** |
| `label`   | `string`                     | The text label to display inside the button.                                                                                               | —            |
| `label_ar`| `string`                     | The Arabic version of the label.                                                                                                             | —            |
| `variant` | `"outlined" \| "text" \| "link"` | The visual variant of the button.                                                                                                            | `outlined`   |
| _(From AppIcon)_ | `icon`, `size`, `iconType`, `useReset`, `color` | These optional props allow you to include an icon inside the button using the **AppIcon** component.                                          | —            |

#### Slots

| Slot Name | Description                                |
| --------- | ------------------------------------------ |
| `default` | Override the default content of the button |
| `icon`    | Custom icon content                        |
| `label`   | Custom label content                       |
| `end`     | Content to render at the end of the button |

#### Usage Example

```html
<template>
  <!-- Using a function as action -->
  <AppBtn :action="() => submitForm()" label="Submit" variant="outlined" />

  <!-- Using a router link -->
  <AppBtn action="/dashboard" label="Go to Dashboard" variant="text" />

  <!-- Using an external link -->
  <AppBtn action="http://example.com" label="Visit Site" variant="link" />

  <!-- With custom slots -->
  <AppBtn :action="handleAction">
    <template #icon>
      <!-- Custom icon can be placed here -->
      <span class="custom-icon"></span>
    </template>
    <template #label>
      Custom Button Label
    </template>
    <template #end>
      <span class="arrow-icon"></span>
    </template>
  </AppBtn>
</template>

<script setup lang="ts">
function submitForm() {
  // Form submission logic
}
function handleAction() {
  console.log('Button action executed');
}
</script>
```

---

### AppImage

A wrapper around PrimeVue's Image component that automatically handles relative URLs and fallback images.

#### Props

| Prop  | Type     | Description                                                                                                           |
| ----- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `src` | `string` | The source URL of the image. If the URL is relative, it will be prefixed with `VITE_BASE_IMAGE_URL` from the environment. |
| _Other props from PrimeVue's Image_ | — | All additional props supported by PrimeVue's Image component are available.                                         |

#### Events

| Event              | Description                                        |
| ------------------ | -------------------------------------------------- |
| `load`             | Emitted when the image loads successfully.         |
| `error`            | Emitted when an error occurs while loading the image. |
| `placeholder-loaded` | Emitted when a placeholder image loads.             |
| `fallback-error`   | Emitted if the fallback image fails to load.         |

#### Usage Example

```html
<template>
  <AppImage src="assets/photos/sample.jpg" alt="Sample Image" />
</template>
```

---

### AppIcon

A dynamic icon component that supports both PrimeVue icons and custom SVG icons. It fetches and caches SVG icon content when needed.

#### Props

| Prop      | Type                                    | Description                                                                                                     |
| --------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `icon`    | `string`                                | The name/identifier of the icon to display.                                                                     |
| `size`    | `"small" \| "medium" \| "large"`          | The size of the icon.                                                                                             |
| `iconType`| `"primevue" \| "svg"`                     | The icon type to use. When set to `primevue`, a PrimeVue icon class is rendered; otherwise, custom SVG handling is applied. |
| `useReset`| `boolean`                               | If `true`, resets the SVG attributes to default values.                                                         |
| `color`   | `string`                                | The color to apply to the icon.                                                                                   |

#### Slots

| Slot Name | Description                        |
| --------- | ---------------------------------- |
| `top`     | Content rendered above the icon. |
| `bottom`  | Content rendered below the icon. |

#### Usage Example

```html
<template>
  <!-- Using a PrimeVue icon -->
  <AppIcon icon="user" size="medium" iconType="primevue" color="#555" />

  <!-- Using a custom SVG icon -->
  <AppIcon icon="custom-icon" size="large" iconType="svg" color="#1a73e8">
    <template #top>
      <small>Top Content</small>
    </template>
    <template #bottom>
      <small>Bottom Content</small>
    </template>
  </AppIcon>
</template>
```

---

### AppSection

A layout component designed to wrap sections of your application with consistent spacing and optional styling adjustments.

#### Props

| Prop                | Type      | Description                                                  |
| ------------------- | --------- | ------------------------------------------------------------ |
| `sectionName`       | `string`  | The title of the section.                                    |
| `sectionDescription`| `string`  | A short description for the section.                         |
| `dark`              | `boolean` | If `true`, applies a darker theme to the section.            |
| `narrow`            | `boolean` | If `true`, constrains the width of the section's content.      |
| `center`            | `boolean` | If `true`, centers the section title and description.          |

#### Usage Example

```html
<template>
  <AppSection
    sectionName="About Us"
    sectionDescription="Learn more about our company."
    :dark="false"
    :narrow="true"
    :center="true"
  >
    <p>Our mission is to ...</p>
  </AppSection>
</template>
```

---

### AppHeader

A comprehensive header component that integrates navigation, logo display, and locale toggling. It leverages PrimeVue's Menubar and wraps navigation items with **AppBtn**.

#### Props

| Prop            | Type                                                | Description                                                                                         |
| --------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `items`         | `Array<MenuItem & { labelAr?: string }>`             | The menu items to display in the header. Each item can include labels in different languages and routing information. |
| `hideLocalSwitch` | `boolean`                                         | If `true`, the locale toggler is hidden.                                                           |
| `logo`          | `string` or `Object`                                | The logo to display. If a string is provided or the object’s `type` is not `'icon'`, it renders as an image. Otherwise, it renders as an icon. The object may include `src`, `type`, and `size`. |

#### Slots

| Slot Name         | Description                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `logo`            | Custom content for the logo section.                                                                            |
| `language-toggler`| Custom content for the locale toggler; receives a `toggleLocale` function as a slot prop from **AppLocaleToggler**.|

#### Usage Example

```html
<template>
  <AppHeader
    :items="menuItems"
    :logo="{ src: 'logo.png', type: 'image' }"
    :hideLocalSwitch="false"
  >
    <!-- Optional: Custom logo slot -->
    <template #logo>
      <img src="custom-logo.png" alt="Custom Logo" />
    </template>

    <!-- Optional: Custom language toggler -->
    <template #language-toggler="{ toggleLocale }">
      <button @click="toggleLocale">Switch Language</button>
    </template>
  </AppHeader>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';

const menuItems = ref<MenuItem[]>([
  {
    label: 'Home',
    labelAr: 'الرئيسية',
    route: '/',
    icon: 'home'
  },
  {
    label: 'About',
    labelAr: 'حول',
    route: '/about',
    icon: 'info'
  }
  // ...more items
]);
</script>
```

---

### AppLocaleToggler

A dedicated component for switching between locales. Typically used in the header, it works with Vue I18n and the plugin’s caching mechanism to persist user locale preferences.

#### Usage Example

While the internal implementation details are abstracted away, you can use it as follows:

```html
<template>
  <AppLocaleToggler>
    <template #default="{ toggleLocale }">
      <button @click="toggleLocale">Toggle Language</button>
    </template>
  </AppLocaleToggler>
</template>
```

---

## Helpers & Configuration

### setupI18nSync

A helper function to synchronize the Vue I18n locale with a cached locale (e.g., retrieved from a database or local storage). Use this function inside your component’s `setup()`:

```js
import { setupI18nSync } from 'devkit-base-components';

export default {
  setup() {
    setupI18nSync();
  }
};
```

### Cache & Icon Helpers

The plugin exports two helper objects for advanced usage:

- **cacheHelper:** Manages caching functions (for instance, storing locale preferences).
- **iconHelper:** Helps with creating and fetching icons, including caching of SVG content.

Import them as needed:

```js
import { cacheHelper, iconHelper } from 'devkit-base-components';
```

---

## Development

### Repository Structure

- **`devkit-base-components/src/app/base/`**  
  Contains all the Vue components:
  - `AppBtn.vue`
  - `AppIcon.vue`
  - `AppLocaleToggler.vue`
  - `AppHeader.vue`
  - `AppImage.vue`
  - `AppSection.vue`

- **`devkit-base-components/src/devkit_base_components.ts`**  
  The main plugin file that registers components, provides helper functions, and exposes the plugin installation.

### Building the Package

Clone the repository, install dependencies, and build using Vite:

```bash
git clone https://github.com/darwishdev/devkit_base_components.git
cd devkit-base-components
npm install
npm run build
```

### Running the Documentation Site

The `docs` folder contains a Vue project that demonstrates how to use this package. To run it locally:

```bash
cd docs
npm install
npm run serve
```

### Storybook

For component development and testing:

```bash
npm run storybook
```

And to build Storybook’s static files:

```bash
npm run build-storybook
```

---

## Contributing

Contributions are welcome! If you have bug fixes, improvements, or new feature ideas, please open an issue or submit a pull request. Ensure that your changes include proper tests and documentation.

---

## Peer Dependencies

Ensure your project includes the following peer dependencies:

- `vue` (v3.0.0 or higher)
- `vue-router` (v4.x)
- `vue-i18n` (v10.x)
- `tailwindcss` (v3.0.0 or higher)
- `tailwindcss-primeui` (v0.4.0 or higher)
- `primevue` (v4.2.2 or higher)
- `dexie` (v4.0.10 or higher)

---

## License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for more details.
```

---

Feel free to modify, extend, or reorganize sections as your project evolves. This README aims to provide a clear and comprehensive guide for users and contributors of the **Devkit Base Components** package.
