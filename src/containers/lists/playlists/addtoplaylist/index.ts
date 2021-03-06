import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { addPlaylistItem, removePlaylistItem } from '../../../../actions';
import { getCurrentTrack, getPlaylistsForCurrentTrack } from '../../../../reducers/selectors';
import { AppState } from '../../../../store';

import AddToPlaylist from './AddToPlaylist';

const mapStateToProps = (state: AppState) => ({
	track: getCurrentTrack(state),
	playlists: getPlaylistsForCurrentTrack(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			addPlaylistItem,
			removePlaylistItem,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylist);
