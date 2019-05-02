import React from 'react';

const Readlater = (props) => {
    return (
        <div className="column column-55">
            <h2 className="newsColumnTitle">Read Later</h2>
            <ul className="readLaterList">
                <List readList={props.readList} removeFromList={props.removeFromList}/>
            </ul>
        </div>
    )
};

const List = (props) => {
    return (
        props.readList.map((obj, index) => {
            return (<li key={index}>
                <h4 className="readLaterItem-title">{obj.webTitle}</h4>
                <section>
                    <a href={obj.webUrl} target="_blank" className="button button-clear">Read</a>
                    <button className="button button-clear" onClick={() => props.removeFromList(index)}>Remove</button>
                </section>
            </li>)
        })
    )


};

export default Readlater;
