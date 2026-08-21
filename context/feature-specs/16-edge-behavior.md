Replace the default canvas edges with custom edges that feel easier to follow, easier to click, and support inline lables.

## Implementation

1. Add connection handles to every node.
- place handles on the top, right, bottom and left sides
- users should be able to connect from any handle to any other handle
- keep the handles ubtle: small white do ts with a dark border
- hide them by default and fade them in when hovering the node

2. Add a default style for new edges.
- use a light stroke with rounded ends
- add a arrowhead the end of each edge
- make new connection use the custom canvas edge renderer

3 Creat the custom edge rendere.
- use clean right-angle routing
- keep edges slighlty dimmed at rest
- brighten edges when hovered or selected
- make edges easier to hover and click without increasing the visible line thinckness

4. Add inline edge label editing:
- double-click an edge to edit its label
- use React Flow's `EdgeLabelRenderer` and path midpoint coordinates from `getSmoothStepPath` to postion the label
- do not calculate midpoint postion manually
- use an input that grows with the label text

## Check when done
- the connection handle should be added
- styling should be as per requirements
- `npm run build` passes without type errors.



