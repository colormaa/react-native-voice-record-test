//Example to play music in React Native
import React, { Component } from 'react';
//Import React
import {
  StyleSheet,
  Text, PermissionsAndroid,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
//Import basic elements we need from React Native
import Sound from 'react-native-sound';
//Import library for Sound Component
//List of the dummy sound track
import { transcode } from 'react-native-audio-transcoder'
const audioList = [
  {
    title: 'Play mp3 sound from Local',
    isRequire: true,
    url: require('./Happier.mp3'),
  },
  {
    title: 'Play mp3 sound from remote URL',
    url:
      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
  },
  {
    title: 'Play aac sound from Local',
    isRequire: true,
    url: require('./Happier.mp3'),
  },
  {
    title: 'Play aac sound from remote URL',
    url:
      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac',
  },
  {
    title: 'Play wav sound from Local',
    isRequire: true,
    url: require('./Happier.mp3'),
  },
  {
    title: 'Play wav sound from remote URL',
    url:
      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/frog.wav',
  },
];

var sound1, sound2, sound3, sound4, sound5, sound6;

function playSound(item, index) {
  if (index == 0) {
    sound1 = new Sound(item.url, (error, sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      sound1.play(() => {
        sound1.release();
      });
    });
  } else if (index == 1) {
    sound2 = new Sound(item.url, '', (error, sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      sound2.play(() => {
        sound2.release();
      });
    });
  } else if (index == 2) {
    sound3 = new Sound(item.url, (error, sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      sound3.play(() => {
        sound3.release();
      });
    });
  } else if (index == 3) {
    sound4 = new Sound(item.url, '', (error, sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      sound4.play(() => {
        sound4.release();
      });
    });
  } else if (index == 4) {
    sound5 = new Sound(item.url, (error, sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      sound5.play(() => {
        sound5.release();
      });
    });
  } else if (index == 5) {
    sound6 = new Sound(item.url, '', (error, sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      sound6.play(() => {
        sound6.release();
      });
    });
  }
}

function stopSound(item, index) {
  if (index == 0 && sound1) {
    sound1.stop(() => {
      console.log('Stop');
    });
  } else if (index == 1 && sound2) {
    sound2.stop(() => {
      console.log('Stop');
    });
  } else if (index == 2 && sound3) {
    sound3.stop(() => {
      console.log('Stop');
    });
  } else if (index == 3 && sound4) {
    sound4.stop(() => {
      console.log('Stop');
    });
  } else if (index == 4 && sound5) {
    sound5.stop(() => {
      console.log('Stop');
    });
  } else if (index == 5 && sound6) {
    sound6.stop(() => {
      console.log('Stop');
    });
  }
}

function componentWillUnmount() {
  sound1.release();
  sound2.release();
  sound3.release();
  sound4.release();
  sound5.release();
  sound6.release();
}

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
let path = Platform.select({
  ios: 'hello.m4a',
  android: 'hello.mp4',
});


class App extends Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Playback', true); // true = mixWithOthers
    this.state = {
      tests: {},
      path:'', 
      newpath:''
    };
    
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }
  
  getRecordPerm=async ()=>{
    var recperm = await this.requestRecordPermission();
    var writeperm=await this.requestWritePermission();
    return recperm && writeperm;
  }
  onStartRecord = async () => {
    var permissionresult = await this.getRecordPerm();
    if(permissionresult){
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
      return;
    });
    this.setState({path:result})
    console.log(result);
    }else{
      console.log("permssion denied")
    }
  }
  
  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
    const myFilePath = result;
    //platform == android bol mp4 ios bol uur m4a
    const myNewFile = myFilePath.replace('.mp4', '123.mp3')
    this.setState({newpath:myNewFile})


transcode(myFilePath, myNewFile)
    .then(() =>{
     
      console.log("transcoded finished ")
      
      // const RNFetchBlob = require('rn-fetch-blob').default
      //      // this.setState({ recordStart: false, fileUri: rec.fsPath, Duration: this.state.Duration, hasVoice: 1 });
      //      // clearInterval(this.progressInterval);
      //   RNFetchBlob.fs.readFile(myFilePath, 'base64')
      //       .then((data) => {
      //         console.log("file base64", data)  
              
      //         //formData.append('base64', `data:audio/mp3;base64,${data}`);
      //       })
  })
  .catch(err=>{
    console.log("can not transcode", err)
  })
}
  
  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer();
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  }
  
  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  }
  
  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  }
  requestRecordPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
requestWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>
            Example to Play Music in React Native
          </Text>
          <ScrollView style={styles.container}>
            <TouchableOpacity onPress={()=>{ this.onStartRecord()}}><Text>On start record</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{ this.onStopRecord()}}><Text>On stop record</Text></TouchableOpacity>

            <TouchableOpacity onPress={()=>{ this.onStartPlay()}}><Text>On start play</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{ this.onStopPlay()}}><Text>On stop play</Text></TouchableOpacity>



          <Text>
path 
            {this.state.path}
</Text>
<Text> new path 
            {this.state.newpath}
          </Text>



            {audioList.map((item, index) => {
              return (
                <View style={styles.feature} key={item.title}>
                  <Text style={{ flex: 1, fontSize: 14 }}>{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      return playSound(item, index);
                    }}>
                    <Text style={styles.buttonPlay}>Play</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      return stopSound(item, index);
                    }}>
                    <Text style={styles.buttonStop}>Stop</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(00,00,80,1)',
  },
  buttonPlay: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(00,80,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  buttonStop: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(80,00,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)',
  },
});