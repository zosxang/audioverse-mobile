import { Track } from 'react-native-track-player';

import { ContentTypes } from '../constants';
import { legacyBibleIdsMap } from '../constants/bibles';
import { LANGUAGE_MAP } from '../sagas/api';
import { AppState } from '../store';
import { parseBibleChapter, parseRecording } from '../utils';

export const getLanguage = (state: AppState) => state.settings.language as keyof typeof LANGUAGE_MAP;
export const getBitRate = (state: AppState) => state.settings.bitRate;
export const getAutoPlay = (state: AppState) => state.settings.autoPlay;

export const getTracks = (state: AppState) => state.playback.tracks;
export const getCurrentTrack = (state: AppState) =>
	state.playback.tracks.find((el: Track) => el.id === state.playback.currentTrackId);
export const getCurrentTrackId = (state: AppState) => state.playback.currentTrackId;
export const getRate = (state: AppState) => state.playback.rate;
export const getPosition = (state: AppState) => state.playback.position;

export const getBible = (state: AppState) => {
	const id = legacyBibleIdsMap[state.bible.version.id];
	return {
		...state.bible,
		version: {
			...state.bible.version,
			id,
		},
	};
};
export const getBibleBooks = (state: AppState) => state.bibleBooks.data;
export const getBibleBooksPagination = (state: AppState) => state.bibleBooks;
export const getBibleChapters = (state: AppState) =>
	state.bibleChapters.data.map((item) => {
		const chapter = parseBibleChapter(item, state.bible);
		return {
			...chapter,
			local: state.localFiles.indexOf(chapter.id) !== -1,
		};
	});
export const getBibleChaptersPagination = (state: AppState) => state.bibleChapters;
export const getNewRecordings = (state: AppState) => state.newRecordings.data.map((item: any) => parseRecording(item));
export const getNewRecordingsPagination = (state: AppState) => state.newRecordings;
export const getTrendingRecordings = (state: AppState) =>
	state.trendingRecordings.data.map((item: any) => parseRecording(item.recording));
export const getTrendingRecordingsPagination = (state: AppState) => state.trendingRecordings;
export const getFeaturedRecordings = (state: AppState) =>
	state.featuredRecordings.data.map((item: any) => parseRecording(item));
export const getFeaturedRecordingsPagination = (state: AppState) => state.featuredRecordings;
export const getBooks = (state: AppState) => state.books.data;
export const getBooksPagination = (state: AppState) => state.books;
export const getBook = (state: AppState) =>
	state.book.data.map((item: any) => {
		const recording = parseRecording(item);
		// contentType property was added later on on the API, since the book is being cached check if it doesn't exists
		if (!recording.contentType) {
			recording.contentType = ContentTypes.book;
		}

		const mediaFile = { ...recording.mediaFiles[0] };
		mediaFile.filename = mediaFile.filename.substring(mediaFile.filename.lastIndexOf('/') + 1);
		if (/^00_/i.test(mediaFile.filename)) {
			// some chapters have the same file name in other books
			// like 00_Foreword.mp3 and 00_Preface.mp3
			// so we need to add some text to avoid to overwrite them
			mediaFile.filename = `${recording.id}_${mediaFile.filename}`;
		}
		recording.mediaFiles = [mediaFile];
		return {
			...recording,
			local: state.localFiles.indexOf(recording.id) !== -1,
		};
	});
export const getBookPagination = (state: AppState) => state.book;
export const getStories = (state: AppState) => state.stories.data;
export const getStoriesPagination = (state: AppState) => state.stories;
export const getStory = (state: AppState) => state.story.data.map((item: any) => parseRecording(item));
export const getStoryPagination = (state: AppState) => state.story;
export const getPresenters = (state: AppState) => state.presenters.data;
export const getPresentersPagination = (state: AppState) => state.presenters;
export const getPresenter = (state: AppState) => state.presenter.data.map((item: any) => parseRecording(item));
export const getPresenterPagination = (state: AppState) => state.presenter;
export const getConferences = (state: AppState) => state.conferences.data;
export const getConferencesPagination = (state: AppState) => state.conferences;
export const getConference = (state: AppState) => state.conference.data.map((item: any) => parseRecording(item));
export const getConferencePagination = (state: AppState) => state.conference;
export const getSponsors = (state: AppState) => state.sponsors.data;
export const getSponsorsPagination = (state: AppState) => state.sponsors;
export const getSponsor = (state: AppState) => state.sponsor.data.map((item: any) => parseRecording(item));
export const getSponsorPagination = (state: AppState) => state.sponsor;
export const getSeries = (state: AppState) => state.series.data;
export const getSeriesPagination = (state: AppState) => state.series;
export const getSerie = (state: AppState) => state.serie.data.map((item: any) => parseRecording(item));
export const getSeriePagination = (state: AppState) => state.serie;
export const getTopics = (state: AppState) => state.topics.data.map((item) => item.topics);
export const getTopicsPagination = (state: AppState) => state.topics;
export const getTopic = (state: AppState) => state.topic.data.map((item) => parseRecording(item.recordings));
export const getTopicPagination = (state: AppState) => state.topic;
export const getTagsBooks = (state: AppState) => state.tagsBooks.data;
export const getTagsBooksPagination = (state: AppState) => state.tagsBooks;
export const getTagBook = (state: AppState) => state.tagBook.data.map((item: any) => parseRecording(item));
export const getTagBookPagination = (state: AppState) => state.tagBook;
export const getTagsAlbums = (state: AppState) => state.tagsAlbums.data;
export const getTagsAlbumsPagination = (state: AppState) => state.tagsAlbums;
export const getTagAlbum = (state: AppState) => state.tagAlbum.data.map((item: any) => parseRecording(item));
export const getTagAlbumPagination = (state: AppState) => state.tagAlbum;
export const getTagsSponsors = (state: AppState) => state.tagsSponsors.data;
export const getTagsSponsorsPagination = (state: AppState) => state.tagsSponsors;
export const getTagSponsor = (state: AppState) => state.tagSponsor.data.map((item: any) => parseRecording(item));
export const getTagSponsorPagination = (state: AppState) => state.tagSponsor;
export const getTags = (state: AppState) => state.tags.data;
export const getTagsPagination = (state: AppState) => state.tags;
export const getTag = (state: AppState) => state.tag.data.map((item: any) => parseRecording(item));
export const getTagPagination = (state: AppState) => state.tag;

export const getDownloads = (state: AppState) => state.lists.downloads.map((el) => parseRecording(el));
export const getDownloadsById = (state: AppState, id: string) => getDownloads(state).filter((el) => el.id === id);
export const getDownloadById = (state: AppState, id: string) => getDownloads(state).find((el) => el.id === id);
export const isFavorite = (state: AppState) =>
	state.lists.favorites.some((el) => el.id === state.playback.currentTrackId && !el.deleted);
export const getFavorite = (state: AppState, id: string) => state.lists.favorites.find((el) => el.id === id);
export const getAllFavorites = (state: AppState) => state.lists.favorites;
export const getFavorites = (state: AppState) =>
	state.lists.favorites.filter((el) => !el.deleted).map((el) => parseRecording(el));
export const getLocalFavorites = (state: AppState) => state.lists.favorites.filter((el) => !el.favoriteId);
export const getDeletedFavorites = (state: AppState) => state.lists.favorites.filter((el) => el.deleted);
export const getAllPlaylists = (state: AppState) => state.lists.playlists;
export const getPlaylists = (state: AppState) => state.lists.playlists.filter((el) => !el.deleted);
export const getLocalPlaylists = (state: AppState) => state.lists.playlists.filter((el) => el.local);
export const getDeletedPlaylists = (state: AppState) => state.lists.playlists.filter((el) => el.deleted);
export const getPlaylistsForCurrentTrack = (state: AppState) =>
	state.lists.playlists
		.filter((el) => !el.deleted)
		.map((el) => {
			const selected = state.lists.playlistsItems.some(
				(item) => !item.deleted && item.playlistId === el.id && item.id === state.playback.currentTrackId
			);
			return {
				...el,
				selected,
			};
		});

export const getAllPlaylistsItems = (state: AppState) => state.lists.playlistsItems;
export const getPlaylistItems = (state: AppState, playlistId: string) =>
	state.lists.playlistsItems
		.filter((el) => !el.deleted && el.playlistId === playlistId)
		.map((el) => parseRecording(el));
export const getPlaylistItem = (state: AppState, playlistId: string, id: string) =>
	state.lists.playlistsItems.find((el) => el.playlistId === playlistId && el.id === id);
export const getLocalPlaylistItems = (state: AppState, playlistId: string) =>
	state.lists.playlistsItems.filter((el) => el.local && el.playlistId === playlistId);
export const getDeletedPlaylistItems = (state: AppState, playlistId: string) =>
	state.lists.playlistsItems.filter((el) => el.deleted && el.playlistId === playlistId);

export const getHistory = (state: AppState) => state.lists.history.map((el) => parseRecording(el));
export const getDownloadsQueue = (state: AppState) => state.downloadsQueue.queue;
export const getDownloadsQueueItems = (state: AppState) => state.downloadsQueue.queue.map((el) => el.data);
export const getDownloading = (state: AppState) => state.downloadsQueue.downloading;
export const getUser = (state: AppState) => state.user;
