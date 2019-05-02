/*o first of all I know that I should have used your template, but I got some errors with intelliJ - eslint compatibility,
 * so to speed things up I used the npm create-react-app, I hope it's ok for me to use react in this task,
 * i mean it is possible to do it in plain JS, but I would probably kill myself if had to write all those querySelectors
 * and appendChild lines. So the approach - looked at the task => cursed for a few minutes because of the errors =>
 * ued the npm create... command and copied your code here => implemented the toRead functionality=> read up on the API=>
 * read up on fetch, never used it before we use axios at work, but as I see it's almost the same => wrote the gets =>
 * wrote the comments. If anything is unclear I'll answer all the questions ( ͡° ͜ʖ ͡°) */
/* So I also sent a version without localstorage, because I overloocked that part at first, here's the proper one */

import React from 'react';
import "./../styles/main.css";
import Readlater from './readlater';
import NewsList from './newsList';
import Search from './search'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            readLaterList: [],
            allNewsList: [],
            numberOfPages: [0],
            newsContentSearch: '',
            activePageSelect: '1',
            sectionSelect: '',
            date: '',
            apiKey: "3eda75fb-3f76-4eca-be25-42e2d9dfbd5d"
        }
    }

    async componentDidMount() {
        await this.handleSetDateFrom();
        this.setState({
            readLaterList: JSON.parse(localStorage.getItem('readLaterList')) ? JSON.parse(localStorage.getItem('readLaterList')) : [],
        });

        //fetching all news from 30 days to make select from section ID, different state, so the select options can stay if we search
        await fetch(`https://content.guardianapis.com/search?api-key=${this.state.apiKey}&from-date=${this.state.date}`)
            .then(response => {
                response.json().then(data => {
                    this.setState({
                        allNewsList: data.response.results,
                        numberOfPages: Array.from(Array(data.response.pages).keys()),
                        newsList: data.response.results
                    });
                })
            });
    }

    handleSetDateFrom = () => {
        let date = new Date();
        date.setDate(date.getDate() - 30);
        let dateString = date.toISOString().split('T')[0];
        this.setState({
            date: dateString
        });
    };
    handleChange = async (event) => {
        let name = event.target.id;
        let value = event.target.value;
        await this.setState({
            [name]: value
        });
        this.handleFetchData();
    };
    handleFetchData = () => {
        fetch(`https://content.guardianapis.com/search?${((this.state.sectionSelect !== '') ? ("section=" + this.state.sectionSelect + "&") : "")
        + ("from-date=" + this.state.date + "&") + ("page=" + this.state.activePageSelect + "&")
        + (this.state.newsContentSearch !== '' ? ("q=" + this.state.newsContentSearch + "&") : "")
        + ("api-key=" + this.state.apiKey)}`)
            .then(response => {

                if (response.status !== 200) {
                    alert('Error, please reload or something')
                } else {
                    response.json().then(data => {
                        this.setState({
                            //needed an array to map the options in search component
                            numberOfPages: Array.from(Array(data.response.pages).keys()),
                            newsList: data.response.results
                        });
                    })
                }

            })
    };

    handleReadlater = (index) => {
//if added to block the possibility of adding the same article over and over
        if (!this.state.readLaterList.find(a => a.id === this.state.newsList[index].id)) {
            let toRead = this.state.readLaterList;
            toRead.push(this.state.newsList[index]);
            this.setState({
                readLaterList: toRead
            });
            localStorage.setItem('readLaterList', JSON.stringify(this.state.readLaterList));
        } else {
            return false
        }

    };

    handleRemoveFromList = (index) => {
        let newState = this.state.readLaterList;
        newState.splice(index, 1);
        this.setState({
            readLaterList: newState
        });
        localStorage.setItem('readLaterList', JSON.stringify(this.state.readLaterList));
    };


    render() {
        return (
            <div>
                <main className="wrapper">
                    <header className="appHeader">
                        <div className="container appHeader-inner">
                            <img src={require('./../assets/logo.png')} alt="company logo" className="companyLogo"/>
                            <h1 className="appTitle">Recruitment task</h1>
                        </div>
                    </header>
                    <Search change={this.handleChange}
                            numberOfPages={this.state.numberOfPages}
                            allNewsList={this.state.allNewsList}/>
                    <section className="container newsContainer">
                        <div className="row">
                            <div className="column column-65">
                                <h2 className="newsColumnTitle">News List</h2>
                                <NewsList newsList={this.state.newsList}
                                          readLater={this.handleReadlater}/>
                            </div>
                            <Readlater readList={this.state.readLaterList}
                                       removeFromList={this.handleRemoveFromList}/>
                        </div>
                    </section>
                </main>

            </div>

        )
    }
}


export default Main;
