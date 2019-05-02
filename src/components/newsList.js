import React from 'react';

const NewsList = (props) => {
    return (
        <ul className="newsList">
            <NewsItem newsList={props.newsList} readLater={props.readLater}/>
        </ul>
    )

};

const NewsItem = (props) => {
    return (
        props.newsList.map((obj, index) => {
            return (
                <li key={index}>
                    <article className="news">
                        <header>
                            <h3>{obj.webTitle}</h3>
                        </header>
                        <section className="newsDetails">
                            <ul>
                                <li><strong>Section Name:</strong> {obj.sectionName}</li>
                                <li><strong>Publication Date:</strong> {obj.webPublicationDate}</li>
                            </ul>
                        </section>
                        <section className="newsActions">
                            <a href={obj.webUrl} target="_blank"  className="button">Full article</a>
                            <button className="button button-outline" onClick={() => props.readLater(index)}>Read
                                Later
                            </button>
                        </section>
                    </article>
                </li>
            )
        })
    )

};

export default NewsList
