import {
  Drawer,
  Box,
  useTheme,
  Avatar,
  Divider,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import logoUnioeste from '../../images/logo_unioeste.png';

export const menuLateral: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Drawer variant="permanent">
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src=""
            />
          </Box>

          <Divider />

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Menu
              </ListSubheader>
            }
          >
            <ListItemButton href="/criar-emprestimo">
              <ListItemText primary="Registrar empréstimo" />
            </ListItemButton>

            <ListItemButton href="/listar-emprestimos">
              <ListItemText primary="Listar empréstimos" />
            </ListItemButton>

            <ListItemButton href="/listar-emprestimos-devolvidos">
              <ListItemText primary="Log de empréstimos" />
            </ListItemButton>

            <ListItemButton href="/criar-curso">
              <ListItemText primary="Criar curso" />
            </ListItemButton>

            <ListItemButton href="/listar-cursos">
              <ListItemText primary="Listar cursos" />
            </ListItemButton>

            <ListItemButton href="/criar-sala">
              <ListItemText primary="Criar sala" />
            </ListItemButton>

            <ListItemButton href="/listar-salas">
              <ListItemText primary="Listar salas" />
            </ListItemButton>

            <ListItemButton href="criar-funcionario">
              <ListItemText primary="Criar funcionário" />
            </ListItemButton>

            <ListItemButton href="listar-funcionarios">
              <ListItemText primary="Listar funcionários" />
            </ListItemButton>
          </List>

          <Box flex={1}></Box>
        </Box>
      </Drawer>
    </>
  );
};

export default menuLateral;
