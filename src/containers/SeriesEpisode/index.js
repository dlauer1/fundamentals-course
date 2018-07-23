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
            console.log('ep_info', episode_info)
            return (

                <div>
                    {
                        <div>
                            <p style={{fontSize: '200%'}}><strong>{show.name}</strong></p>
                            <p>Airdate - <strong>{episode_info.airdate}</strong></p>
                            <p>Episode Name - <strong>{episode_info.name}</strong></p>
                            <p>
                                <img alt='Show' src={episode_info.image.medium} />
                            </p>
                            <div style={{backgroundColor: '#fff', margin: '0 auto', width: '20%'}}><strong>Summary</strong> - <br />{episode_info.summary.substring(3, episode_info.summary.length - 4)}</div>
                        </div>
                    }

                </div>
            )
        }
    }
}
export default SeriesEpisode;