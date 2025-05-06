import { EditableSpan } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"
import { type DomainTodolist} from "@/features/todolists/model/todolists-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "@/features/todolists/api/todolistsApi"
import { RequestStatus } from "@/common/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    changeTodolistStatus("loading")
    removeTodolist(id)
    .unwrap()
    .catch(() => {
      changeTodolistStatus("idle")
    })
  }
 const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }
  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }



  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
