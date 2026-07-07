<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Base UI React Slider Rules

When working with `@base-ui/react` (Base Nova style) in Next.js 16 and Tailwind CSS v4, follow these instructions to prevent non-functional components:

## 1. Event Signatures and Controlled Values
- **`onValueChange`**: In `@base-ui/react/slider`, the signature is:
  ```typescript
  (value: number | number[], eventDetails: ChangeEventDetails) => void
  ```
  - For range/multi-thumb sliders, `value` is an array (`number[]`).
  - For single-thumb sliders, `value` is a scalar `number`.
- **Integration with Form Libraries**: When integrating the Slider with a controlled form library (like `react-hook-form`'s `<Controller />`), always handle both types dynamically:
  ```tsx
  onValueChange={(val) => onChange(Array.isArray(val) ? val[0] : val)}
  ```
  Attempting to access `val[0]` blindly on a single-thumb slider returns `undefined`, resetting the form.

## 2. Thumb Identifiers
- **`index` Prop**: Always pass `index={index}` to `<SliderPrimitive.Thumb>` inside any loop. Without the explicit index, dragging gestures will fail to update coordinates.
  ```tsx
  {_values.map((_, index) => (
    <SliderPrimitive.Thumb key={index} index={index} />
  ))}
  ```

## 3. Tailwind v4 Orientation Styling
- Do not use custom variants like `data-horizontal:` or `data-vertical:` unless explicitly configured. Instead, use standard Tailwind CSS arbitrary attribute selectors:
  - Horizontal track: `data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full`
  - Vertical track: `data-[orientation=vertical]:w-1 data-[orientation=vertical]:h-full`
- Always define a height class (e.g., `h-5` or `h-6`) on `<SliderPrimitive.Control>` for horizontal layouts to ensure a proper click and touch hit target exists for dragging.
