Wire the editor home sidebar and dialogs to the real projects API


## data fetching

The editor home page is a server component

Fetch owned and shared projects server-side using the existing project data helper and pass both lists to the sidebar

No client-side fetching for intital load.

### `Use Project Actions`

Create a hook in `/hooks` that manages dialog state and project mutations.

** Create ** 

- manage create dialog state
- manage project name input
- generate a short unique suffix
- slugify the name to create the room ID
- call `POST /api/project`
- navigate to the new workspace

The Project ID and liveblocks room id should stay aligned.

**Rename**

- store target project id + current name
- call `PATCH /api/projects/[id]`
- refresh on success


**Delete**

- store target project
- call `DELETE /api/project/[id]`
-redirect to `/editor` if deleting the active workspace
- otherwise refresh 


### wiring

Connect the hook to the sidebar nd dialogs:

- create dialog shows room ID preview
- rename dialog pre-fills current name
- delete dialog shows project name

### Check when done

- sidebar uses real project data
- create navigates to workspace
- rename updates correctly
- delete refreshes or redirects correctly
- `npm run build` passes