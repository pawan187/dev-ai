Add a bottom shape panel so users can drag shapes onto the canvas and create new nodes.

## Implmentation

1. Add a floating pill-shaped toolbar at the bottom-center of the canvas.

2. Add draggable icon buttons for these shapes:
    - rectangles
    - diamond
    - circle
    - pill
    - cylinder
    - hexagon

3. When dragging a shape, include the shape name and default size in the drag payload.
    Use sensible default sizes:
    - rectangles should be wider than tall
    - circles should be square
    - diamnods should be slighlty larger so lables have room

4. Add `dragover` and `drop` handling to the canvas wrapper.

5. On `drop`:
- read the dragged shape payload
- convert the screen postion to canvas coordinates using React Flow
- create a new node at that postion
- use an empty label
- use the dragged shape value

6. Generate each node Id using the shape name, timestamp, and a counter.
7. Add a basic rendrer for the custom canvas node types so new nodes are visible
    For this unit, render every shape as a simple bordered rectanlge with label centered. Shape-specific visuls will be added later.

## Check when done

- shape drag payload includes the correct shape nd size data.
- drop logic creates new canvas nodes with the expected shape data.
- New nodes use the custom canvas node type.
- `npm run build` passes without type errors.