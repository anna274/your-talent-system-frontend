import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
  },
  largePaper: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
  },
  inputsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  withMarginButton: {
    marginBottom: 15,
  },
  select: {
    minWidth: '100%',
  },
}));
