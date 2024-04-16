import { TbPlus, TbSearch } from "react-icons/tb";
import "./style.css";
import { Task } from "../../App";
import { Dispatch, SetStateAction, useState } from "react";
import { api } from "../../utils/api";
import Swal from "sweetalert2";

interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
}

interface setTeskProp {
    setTasks: Dispatch<SetStateAction<Task[]>>;
    tasks: Task[];
}

export function BeforeTable({
  search,
  setSearch,
  setTasks,
    tasks,
}: SearchProps & setTeskProp): React.ReactElement {

  const [newTask, setNewTask] = useState<Task>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    status: 0,
    id: Date.now(),
  });

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "search") {
      setSearch(event.target.value);
    } else {
      setNewTask({
        ...newTask,
        [event.target.name]: event.target.value,
      });
    }
  }

  function onAddSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if(newTask.title === '' || newTask.date === ''){
        return Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Preencha todos os campos!',
          })
    } 
    api.post('/', newTask).then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Tarefa adicionada com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
        setTasks([...tasks, newTask]);
        setNewTask({
          title: "",
          date:  new Date().toISOString().split("T")[0],
          status: 0,
          id: Date.now(),
        });
    }).catch((error) => {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo deu errado!',
          })
          
    })
    
    
  }

  return (
    <div className="before-table">
      <section>
        <h2>Adicionar Tarefa</h2>
        <form>
          <input
            type="text"
            placeholder="Nome da tarefa"
            value={newTask.title}
            onChange={onChange}
            name="title"
          />
          <button type="submit" className="btn btn-add" onClick={onAddSubmit}>
            <TbPlus />
            Adicionar
          </button>
        </form>
      </section>
      <section>
        <form onSubmit={() => event?.preventDefault()}>
          <input
            type="text"
            placeholder="Buscar por nome"
            value={search}
            onChange={onChange}
            name="search"
            style={{ display: isSearchVisible ? "block" : "none",
                    transition: "all 0.5s ease-in-out", 
        }}
          />
          <button className="btn btn-find" onClick={() => setIsSearchVisible(!isSearchVisible)}>
            <TbSearch />
          </button>
        </form>
      </section>
    </div>
  );
}
