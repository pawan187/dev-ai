Add resizing and inline label editing to canvas nodes.

## Implementation

1. Add resizing
- selected nodes should show resize handles
- prevent nodes from being resized below a minmum size
- keep resize handles subtle and consistent with the dark canvas UI

2. Add inline label editing.
- keep the node label centered inside the node
- double-click the center/label area of a node to edit its label
- show placeholder text in the same centered postion when the label is empty
- keep editing smooth without causing layout shifts
- show a textarea directly over the label while editing
- update the label as users type
- close editing on blur on `Escape`

3. Keep all node updates connected to the existing collaborative canvas state.

## scope limts

- don't change shape rendering from the previous unit
- don't change the shape panel or drag preview
- don't change how dropped nodes are created
- keep this focused on resize and label editing only

## check when done

- selected nodes show resize handles.
- resizing updates node dimensions through the existing node state flow
- `npm run build` passes