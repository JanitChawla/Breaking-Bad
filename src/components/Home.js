import React, { useEffect, useState, Fragment } from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Search from "./searchbar";

const Home = (props)=> {
    const [character, setCharacter] = useState('');
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
      });
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    useEffect(() => {
        axios
            .get(`https://www.breakingbadapi.com/api/characters?name=${character}`)
            .then((res) => {
                props.dispatch({
                    type : "LOAD",
                    data : [...res.data]
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },[[character]])
    
    const handlePages = (e) => {
        props.dispatch({
            type : "PAGE",
            data : Number(e.target.id)
        });
    }

    const handleClick = (e) => {
        props.dispatch({
            type : "CHAR",
            data : Number(e.target.id)
        })
    }

        const { allCharacters, currentPage, perPage } = props;

        const indexOfLast = currentPage * perPage;
        const indexOfFirst = indexOfLast - perPage;
        const characters = allCharacters.slice(indexOfFirst, indexOfLast);

        //pagination logic not working on netlify but working locally
        // let renderCharacters = characters.map((character) => (
        let renderCharacters = allCharacters.map((character) => (
            <tr key={character.char_id}>
                <td>{character.name}</td>
                <td>{character.occupation[0]}</td>
                <td>{character.birthday}</td>
                <td>{character.status}</td>
                <td>
                    <Link to="/detail" type="button"
                      id={character.char_id}
                      value={character.char_id}
                      className="btn btn-primary"
                      onClick={handleClick}
                    >
                      Show Details
                    </Link>
                </td>
            </tr>
        ))

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allCharacters.length / perPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button
                    key={number}
                    id={number}
                    onClick={handlePages}
                    className="page-item page-link"
                >
                    {number}
                </button>
            );
        });

        let filter = (
            <div style={{marginTop: '20px'}}>
              <div style={{color: "grey" , fontSize: "30px" , fontWeight: 'bold', textAlign: 'center'}}>
              Filter
              </div>
            <FormGroup style={{display: 'flex', width:"40vw", padding: '2px 4px', margin: '20px auto', alignItems: 'center',justifyContent: "center", color: 'black', backgroundColor: 'white' ,height: '50px', borderRadius: '6px'}} row>
              <FormControlLabel
                control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                label="Breaking Bad"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Better Call Saul"
              />
            </FormGroup>
            </div>
          );
          if (state.checkedA || state.checkedB) {
            if(state.checkedA) {
                renderCharacters = characters.filter(character=> character.category == "Breaking Bad")
                .map((character)=>(
                    <tr key={character.char_id}>
                    <td>{character.name}</td>
                    <td>{character.occupation[0]}</td>
                    <td>{character.birthday}</td>
                    <td>{character.status}</td>
                    <td>
                        <Link to="/detail" type="button"
                          id={character.char_id}
                          value={character.char_id}
                          className="btn btn-primary"
                          onClick={handleClick}
                        >
                          Show Details
                        </Link>
                    </td>
                </tr>
                ))}
          if(state.checkedB) {
            renderCharacters = characters.filter(character=> character.category == "Better Call Saul")
                .map((character)=>(
                    <tr key={character.char_id}>
                    <td>{character.name}</td>
                    <td>{character.occupation[0]}</td>
                    <td>{character.birthday}</td>
                    <td>{character.status}</td>
                    <td>
                        <Link to="/detail" type="button"
                          id={character.char_id}
                          value={character.char_id}
                          className="btn btn-primary"
                          onClick={handleClick}
                        >
                          Show Details
                        </Link>
                    </td>
                </tr>
                ))
        }
    }

        return (
            <Fragment style={{backgroundColor: 'black'}}>
                <Search query={(q)=> setCharacter(q)} />
                <div style={{marginBottom: '40px'}}>
                    {filter}
                </div>
                <div id="table-section">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Occupation</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCharacters}
                        </tbody>
                    </table>
                    <div id="page-numbers" className="pagination justify-content-center">
                        {renderPageNumbers}
                    </div>
                </div>
            </Fragment>
        )
}

const mapStateToProps = (state) => ({
    allCharacters : state.allCharacters,
    currentPage: state.currentPage,
    perPage: state.perPage,
    character_id : state.character_id,
    quotes : state.quotes,
    errors : state.errors,
    messages : state.messages
});
export default connect(mapStateToProps)(Home);