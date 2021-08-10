import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Detail = (props) =>{
    useEffect(()=> {
        const id = props.character_id;
        axios
            .get(`https://www.breakingbadapi.com/api/quotes/${id}`)
            .then((res) => {
                props.dispatch({
                    type : "QUOTE",
                    data : [...res.data]
                })
            })
            .catch((err) => {
                console.log(err);
            });
    },[ ]);

    const getOccupation = (characterData) => {
        var occupationList = characterData.occupation;
        if (occupationList === null) {
            return "None";
        }
        var n = occupationList.length;
        var result = '';

        if (n == 0)
        {
            return "None";
        }
        else if (n == 1)
        {
            return occupationList[0];
        }
        else if (n == 2)
        {
            result += occupationList[0];
            result += ' and ';
            result += occupationList[1];

            return result;
        }
        else
        {
            for (let i = 0; i < (n - 2); i++) {
                result += occupationList[i];
                result += ', ';
            }
            result += occupationList[n-2];
            result += ' and ';
            result += occupationList[n-1];

            return result;
        }

    }

    const getSeasons = (characterData) => {
        var seasonList = characterData.appearance;
        if (seasonList === null) {
            return "None";
        }
        var n = seasonList.length;
        var result = '';

        if (n == 0)
        {
            return "None";
        }
        else if (n == 1)
        {
            return seasonList[0];
        }
        else if (n == 2)
        {
            result += seasonList[0];
            result += ' and ';
            result += seasonList[1];

            return result;
        }
        else
        {
            for (let i = 0; i < (n - 2); i++) {
                result += seasonList[i];
                result += ', ';
            }
            result += seasonList[n-2];
            result += ' and ';
            result += seasonList[n-1];

            return result;
        }
    }

    const getQuotes = () => {
        var quotesList = props.quotes;
        var renderQuotes;

        if (quotesList.length == 0) {
            renderQuotes = (
                <li>
                    <h4>
                        None
                    </h4>    
                </li>
            )
            return renderQuotes;
        }

        renderQuotes = quotesList.map((quote) => {
            return (
                
                    <h4>
                        {quote.quote}
                    </h4>  
                
            );
        });

        return renderQuotes;
    }

        if (props.allCharacters.length == 0) {
            return <Redirect to = "/" />;
        }
        const id = props.character_id;
        var characterData = props.allCharacters.filter((item) => item.char_id == id);
        characterData = characterData[0];

        return (
            <div style={{backgroundColor: 'black'}} className="container">
                <div className = "d-flex flex-row row">
                    <div style={{height: '500px', minWidth: '400px' , marginLeft: '0px'}} className="imgContainer col-lg-6 col-sm-6">
                        <img src={characterData.img} />
                    </div>
                    <div style={{color: 'white'}} className="col-lg-6 col-sm-6">
                        <div className = "ht-50 size">
                            Name : {characterData.name}
                        </div>
                        <div className = "ht-50 size">
                            Date of Birth : {characterData.birthday}
                        </div>
                        <div className="ht-50 size">
                            Status : {characterData.status}
                        </div>
                        <div className="ht-50 size">
                            Nickname : {characterData.nickname}
                        </div>
                        <div className="ht-50 size">
                            Actor : {characterData.portrayed}
                        </div>
                        <div className="ht-50 size">
                            Occupation : {getOccupation(characterData)}
                        </div>
                        <div className="ht-50 size">
                            Seasons : {getSeasons(characterData)}
                        </div>
                    </div>
                </div>
                <div style={{color: 'white' , borderRadius: '10px', alignItems: 'center'}} className="d-flex flex-row">
                    <div className="wd-50">
                        <h4 className="">Quotes : </h4>
                    </div>
                    <div className="wd-50">
                        <ul>{getQuotes()}</ul>
                    </div>
                </div>

                <br />
                <br />
            </div>
        )
    }

const mapStateToProps = (state) => ({
    allCharacters : state.allCharacters,
    currentPage: state.currentPage,
    perPage: state.perPage,
    character_id : state.character_id,
    quotes : state.quotes,
    errors : state.errors,
    messages : state.messages,
});
export default connect(mapStateToProps)(Detail);