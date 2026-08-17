Replace the placeholder node renderer with proper shape rendering and a drag preview.

## Implementation

1. Replace the placeholder node shape rendering.
- rectangle, pill and circle should use CSS styling
- diamond, hexagon, cylinder shuold render with svg shapers
- svg shpers should scle with node size
- keep borders subtle t rest and brighter when selected

2. Add shape drag preview.
- whendragging a shape from the shape panel, show a host preview of that shape
- keep the preivew attached to the cursor while dragging
- use the same shape type and default size that till be used on drop
- hide the preview after the shape is dropped or the drag is cancelled
- keep this limited to drag preview behavior only

3. Keep node rendering connected to the exiting collaborative canvas state.

## scope limits

- don't rebuild shape panel layout
- don't change how dropped nodes are created
- don't add resize or label editing yet
- keep drag/drop changes limited to the ghost preview only

## check when done
- nodes render the correct shape variant for each type.
- CSS shapes render correctly for rectagnle, pill, and circle
- svg shapes render and scale correctly for diamond, hexagon, and cylinder
- shape dragging shows a shost preview matching the dragged shape.
- `npm run build` passes without type errors.