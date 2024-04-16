import {
  BsFillTrash3Fill,
  BsFillPencilFill,
  BsCalendar3,
} from "react-icons/bs";
import {
  TbAbc,
  TbAlertCircle,
  TbLoader,
  TbAlertSquare,
  TbCheckbox,
  TbClock,
  TbCirclePlus,
} from "react-icons/tb";

import Swal from "sweetalert2";
import { Task } from "../../App";
import "./style.css";
import { useState } from "react";
import { api } from "../../utils/api";

interface TableProps {
  rows: Task[];
  setRows: (rows: Task[]) => void;
}

const setRowStatus = (status: number): React.ReactNode => {
  const dictStatus: { [key: number]: React.ReactNode } = {
    0: (
      <span className="status status-pendente">
        <TbAlertCircle />
        <span>Pendente</span>
      </span>
    ),
    1: (
      <span className="status status-andamento">
        <TbClock />
        <span>Andamento</span>
      </span>
    ),
    2: (
      <span className="status status-concluido">
        <TbCheckbox />
        <span>Concluído</span>
      </span>
    ),
  };
  return dictStatus[status];
};

const transformDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

export function Table({ rows, setRows }: TableProps): React.ReactElement {
  const [editEnable, setEditEnable] = useState(false);
  const [oldTasks, setOldTasks] = useState<Task[]>(rows);

  function handleEditTask() {
    setEditEnable(true);
  }

  function handleChangeTask(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    task: Task
  ) {
    const { name, value } = e.target;

    const updatedTask = {
      ...task,
      [name]: name === "status" ? parseInt(value) : value,
    };
    const updatedRows = rows.map((row) =>
      row.id === task.id ? updatedTask : row
    );
    setRows(updatedRows);
  }

  function handleDeleteTask(e: React.MouseEvent, task: Task) {
    Swal.fire({
      icon: "warning",
      title: "Deseja excluir a tarefa?",
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/${task.id}`)
          .then((result) => {
            const updatedRows = rows.filter((row) => row.id !== task.id);
            Swal.fire({
              icon: "success",
              title: "Tarefa excluída com sucesso!",
            });
            setOldTasks(updatedRows);
            setRows(updatedRows);
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Erro ao excluir tarefa!",
            });
          });
      }
    });
  }

  function handleSaveTask(e: React.MouseEvent, task: Task) {
    api.put(`/${task.id}`, task).then((response) => {
      
      Swal.fire({
        icon: "success",
        title: "Tarefa salva com sucesso!",
      });

      setEditEnable(false);

    }).catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar tarefa!",
      });
      setOldTasks(rows);
    })


  }

  function handleCancelTask() {
    setEditEnable(false);
  }

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "10%" }}>
            <span>
              <TbLoader />
              Status
            </span>
          </th>
          <th style={{ width: "30%" }}>
            <span>
              <TbAbc />
              Nome da Tarefa
            </span>
          </th>
          <th style={{ width: "10%" }}>
            <span>
              <BsCalendar3 />
              Data inclusão
            </span>
          </th>
          <th style={{ width: "10%" }}>
            <span>
              <TbAlertSquare />
              Ações
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {editEnable ? (
              <>
                <td>
                  <select
                    name="status"
                    id="status"
                    className="input-edit"
                    onChange={(e) => handleChangeTask(e, row)}
                    value={row.status}
                  >
                    <option value="0">Pendente</option>
                    <option value="1">Andamento</option>
                    <option value="2">Concluído</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="title"
                    className="input-edit"
                    value={row.title}
                    onChange={(e) => handleChangeTask(e, row)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="date"
                    className="input-edit"
                    value={row.date}
                    onChange={(e) => handleChangeTask(e, row)}
                  />
                </td>
                <td className="actions">
                  <button className="btn btn-expandir" onClick={
                    (e) => handleSaveTask(e, row)
                  }>
                    <TbCirclePlus /> Salvar
                  </button>
                  <button
                    className="btn btn-excluir"
                    onClick={handleCancelTask}
                  >
                    <TbAlertSquare /> Cancelar
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{setRowStatus(row.status)}</td>
                <td>{row.title}</td>
                <td>{transformDate(row.date)}</td>
                <td className="actions">
                  <button className="btn btn-editar" onClick={handleEditTask}>
                    <BsFillPencilFill /> Editar
                  </button>
                  <button
                    className="btn btn-excluir"
                    onClick={(e) => handleDeleteTask(e, row)}
                  >
                    <BsFillTrash3Fill /> Excluir
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
