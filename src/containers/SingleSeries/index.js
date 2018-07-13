import React, { Component } from 'react';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

class SingleSeries extends Component {
    state = {
        show: null
    }

    componentDidMount() {

        fetch(`http://api.tvmaze.com/shows/${this.props.match.params.id}?embed=episodes`)
            .then(response => response.json())
            .then(json => this.setState({ show: json }));
    }
    render() {
        if (this.state.show === null) {
            return false;
        } else {

            const { show } = this.state;
            console.log(show)
            // const { id } = this.props.match.params;

            const episodes = show._embedded.episodes

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
                            <p>Seasons</p>
                            {episodes.map((episode) => {
                                return (
                                    <div key={episode.id}>
                                        <p>{episode.season}</p>
                                        <p><span>Official Site-</span> 
                                        <Link to={episode.url}>
                                            {episode.name}
                                        </Link>
                                        </p>
                                        
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