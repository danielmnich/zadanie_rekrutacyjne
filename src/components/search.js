import React from "react";

const Search = (props) => {
    return (
        <section className="container filtersContainer">
            <div className="row">
                <div className="column searchColumn">
                    <label htmlFor="newsContentSearch">News content search</label>
                    <input type="search" placeholder="News content search" id="newsContentSearch"
                           onChange={props.change}/>
                </div>
                <div className="column">
                    <label htmlFor="sectionSelect">Section</label>
                    <select id="sectionSelect" onChange={props.change}>
                        <option value="">All</option>
                        <SectionOptions allNewsList={props.allNewsList}/>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="column column-20">
                    <label htmlFor="activePageSelect">Active Page</label>
                    <select id="activePageSelect" onChange={props.change}>
                        <PagesOptions numberOfPages={props.numberOfPages}/>
                    </select>
                </div>
            </div>
        </section>
    )
};
const PagesOptions = (props) => {
    return (
        props.numberOfPages.map((item, index) => {
            return (<option key={index} value={item + 1}>{item + 1}</option>)

        })
    )
};

const SectionOptions = (props) => {
    return (
        props.allNewsList.map((obj, index) => {
            return (
                <option key={index} value={obj.sectionId}>{obj.sectionName}</option>
            )
        })
    )
};
export default Search
