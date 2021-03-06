import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadNewRecordings } from '../../../actions';
import List from '../../../components/list';
import { getNewRecordings, getNewRecordingsPagination } from '../../../reducers/selectors';
import { AppState } from '../../../store';

const mapStateToProps = (state: AppState) => ({
	items: getNewRecordings(state),
	pagination: getNewRecordingsPagination(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadNewRecordings,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
