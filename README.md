# Nullstack Feather Icons

## Description

This package allows you to use the [Feather Icons](https://feathericons.com/) in your Nullstack applications. Feather Icons is a set of free MIT-licensed high-quality SVG icons for you to use in your web projects. Each icon is designed on a 24x24 grid and a 2px stroke.

## Usage

1. Install the package

```sh
npm install nullstack-feather-icons
# or
yarn add nullstack-feather-icons
```

2. Import and use it

```jsx
import { IconAirplay } from "nullstack-feather-icons";

export default function MyApp() {
  return (
    <IconAirplay
      size={36} // set custom `width` and `height`
      color="red" // set `stroke` color
      stroke={3} // set `stroke-width`
    />
  );
}
```

## Available icons

List of available icons: https://feathericons.com/

This version includes **Feather Icons v4.29.0**, see [changelog](https://github.com/feathericons/feather/releases) to know which icons are available.
