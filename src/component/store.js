import {applyMiddleware,createStore,combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


//reducer

//rank reducer
import {rank_UpToUpReducer} from '../reducer/rank_UpToUpReducer.js';
import {rank_NewSongReducer} from '../reducer/rank_NewSongReducer.js';
import {rank_CreateSongReducer} from '../reducer/rank_CreateSongReducer.js';
import {rank_HotSongReducer} from '../reducer/rank_HotSongReducer.js';
import {rank_AudioReducer} from '../reducer/rank_AudioReducer.js';
import {rank_UKReducer} from '../reducer/rank_UKReducer.js';
import {rank_USReducer} from '../reducer/rank_USReducer.js';
import {rank_FrenchReducer} from '../reducer/rank_FrenchReducer.js';
import {rank_iTunesReducer} from '../reducer/rank_iTunesReducer.js';
import {rank_AcgReducer} from '../reducer/rank_AcgReducer.js';
import {rank_BeatportReducer} from '../reducer/rank_BeatportReducer.js';
import {rank_OriconReducer} from '../reducer/rank_OriconReducer.js';
import {rank_MusicalReducer} from '../reducer/rank_MusicalReducer.js';
import {rank_HitReducer} from '../reducer/rank_HitReducer.js';
import {rank_KTVReducer} from '../reducer/rank_KTVReducer.js';
import {rank_HitoReducer} from '../reducer/rank_HitoReducer.js';
import {rank_TopHKReducer} from '../reducer/rank_TopHKReducer.js';
import {rank_TopReducer} from '../reducer/rank_TopReducer.js';
import {rank_HKRadioReducer} from '../reducer/rank_HKRadioReducer.js';
import {rank_HiphopReducer} from '../reducer/rank_HiphopReducer.js';

import {songListDetailReducer} from '../reducer/songListDetailReducer.js'; //each songlist detail data
import {songlistReducer} from '../reducer/songListReducer.js'; //the content of songlist in the funbar

import {isBottomReducer} from '../reducer/isBottomReducer.js'; //to know when i reach bottom

import {radioCategoriesRCMReducer} from '../reducer/radioCategoriesReducer.js'; //to save radio recommand programs
import {radioCategoriesProgramReducer} from '../reducer/radioCategoriesReducer.js';//to save radio all programs
import {radioDetailInfoReducer} from '../reducer/radioDetailInfoReducer.js';//each radioPrograms' Infomation
import {radioDetailProgramsReducer} from '../reducer/radioDetailProgramsReducer.js';//each radioPrograms' list

import {songPlayerReducer} from '../reducer/songPlayerReducer.js';//playerControler  and songlist

import {userLogReducer} from '../reducer/userLogReducer.js'; //record user log

import { navigationBarReducer } from '../reducer/navigationBarReducer.js'; //to control navigationBarActive

const reducers = combineReducers({
    rank_upToUp : rank_UpToUpReducer,
    rank_newSong : rank_NewSongReducer,
    rank_createSong : rank_CreateSongReducer,
    rank_hotSong : rank_HotSongReducer,
    rank_audio: rank_AudioReducer,
    rank_Uk: rank_UKReducer,
    rank_Us: rank_USReducer,
    rank_French: rank_FrenchReducer,
    rank_iTunes: rank_iTunesReducer,
    rank_Acg: rank_AcgReducer,
    rank_Beatport: rank_BeatportReducer,
    rank_Oricon: rank_OriconReducer,
    rank_Musical: rank_MusicalReducer,
    rank_Hit: rank_HitReducer,
    rank_KTV: rank_KTVReducer,
    rank_Hito: rank_HitoReducer,
    rank_Top : rank_TopReducer,
    rank_TopHK: rank_TopHKReducer,
    rank_HKRadio: rank_HKRadioReducer,
    rank_Hiphop: rank_HiphopReducer,
    songListDetail: songListDetailReducer,
    songList:songlistReducer,
    isBottom:isBottomReducer,
    radioCategoriesRCM:radioCategoriesRCMReducer,
    radioCategoriesProgram:radioCategoriesProgramReducer,
    radioDetailInfo:radioDetailInfoReducer,
    radioDetailPrograms:radioDetailProgramsReducer,
    songPlay:songPlayerReducer,
    userLog: userLogReducer,
    navigationBar: navigationBarReducer,
});

const middleware = applyMiddleware(promiseMiddleware(),thunk,logger); //调试使用
// const middleware = applyMiddleware(promiseMiddleware(),thunk); 

export const store = createStore(reducers,{},middleware);