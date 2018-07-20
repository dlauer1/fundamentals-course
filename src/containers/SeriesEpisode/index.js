import React, { Component } from 'react';
import Loader from '../../components/Loader';

class SeriesEpisode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: null,
            isFetching: false
        }
    }

    componentDidMount() {
        console.log(this.props)
        console.log(this.props.match.url.split('/'))
        this.setState({ isFetching: true })
        fetch(`http://api.tvmaze.com/shows/${this.props.match.url.split('/')[2]}?embed=episodes`)
            .then(response => response.json())
            .then(json => this.setState({ show: json, isFetching: false }));

    }


    render() {
        if (this.state.show === null || this.state.isFetching) {
            return (<Loader />)
        } else {

            const { show } = this.state;
            const episodes = show._embedded.episodes
            const ep_num = this.props.match.url.split('/')[3]

            let episode_info = episodes.filter((el) => el.id == ep_num)[0]
            // episodes.map((el)=>{console.log(el.id)})
            console.log('ep_info', episode_info)
            return (

                <div>
                    {
                        <div>
                            <p><strong>{show.name}</strong></p>
                            <p>Airdate - {episode_info.airdate}</p>
                            <p>Episode Name - {episode_info.name}</p>
                            <p>
                                <img alt='Show' src={episode_info.image.medium} />
                            </p>
                            Summary - {episode_info.summary.substring(3, episode_info.summary.length - 4)}
                        </div>
                    }

                </div>
            )
        }
    }
}
export default SeriesEpisode;