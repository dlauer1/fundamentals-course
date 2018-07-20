import React, { Component } from 'react';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

class SingleSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: null
        }
    }

    componentDidMount() {
        console.log(this.props.match.params)
        fetch(`http://api.tvmaze.com/shows/${this.props.match.params.id}?embed=episodes`)
            .then(response => response.json())
            .then(json => this.setState({ show: json }));
    }

    modifydata = (episodes) => {
        let eisodesLength = episodes.length
        let modifiedDataList = []
        let episodeList = []
        let oldSeason = 1
        episodes.forEach((episode, index) => {
            if (index !== eisodesLength - 1) {
                if (episode.season === oldSeason) {
                    episodeList.push(episode)
                } else {
                    modifiedDataList.push(episodeList)
                    oldSeason = episode.season
                    episodeList = []
                }
            } else {
                modifiedDataList.push(episodeList)
                oldSeason = episode.season
                episodeList = []
            }

        });
        return modifiedDataList
    }

    render() {
        if (this.state.show === null) {
            return false;
        } else {

            const { show } = this.state;
            console.log(show)

            const episodes = show._embedded.episodes
            const modifiedData = this.modifydata(episodes)

            return (
                <div>
                    {show === null && <Loader />}
                    {
                        show !== null
                        &&
                        <div>
                            <p><strong>{show.name}</strong></p>
                            <p>Premiered - {show.premiered}</p>
                            <p>Rating - {show.rating.average}</p>
                            <p>Episodes - {show._embedded.episodes.length}</p>
                            <p>
                                <img alt='Show' src={show.image.medium} />
                            </p>

                            {modifiedData.map((episodes, index) => {
                                return (
                                    <div key={index}>
                                        <p><strong>Season {index + 1}</strong></p>
                                        {episodes.map((episode, index) => {
                                            return (
                                                <p key={index}><span>Official Site - </span>
                                                <Link to={`/series/${show.id}/${episode.id}`}>
                                                {episode.name}
                                                </Link>
                                                {/* <a href={episode.url}>{episode.name}</a> */}
                                                </p>
                                            )
                                        }
                                        )}
                                    </div>)
                            })}
                        </div>
                    }
                </div>
            )
        }
    }
}

export default SingleSeries;