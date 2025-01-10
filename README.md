## Usage example
```javascript
import { defineConfig } from "vite"; 
import scalaJSMillPlugin from "vite-plugin-scalajs-mill";

export default defineConfig({
    plugins: [scalaJSMillPlugin({
        moduleNames: 'mymodule'
    })],
})
```
