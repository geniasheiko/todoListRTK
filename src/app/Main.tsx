import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { useAppDispatch } from "@/common/hooks"
import { useAddTodolistMutation } from "@/features/todolists/api/todolistsApi"
import { createTodolistTC } from "@/features/todolists/model/todolists-slice"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"

export const Main = () => {
 const [addTodolists] = useAddTodolistMutation()

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={addTodolists} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
