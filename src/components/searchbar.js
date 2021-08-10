import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: '60%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Search({query}) {
  const classes = useStyles();
  const [search, setSearch] = useState('')
  
  const getQuery = (q) => {
    setSearch(q);
    query(q)
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        value={search}
        onChange={(e)=> getQuery(e.target.value)}
        placeholder="Search Characters"
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
