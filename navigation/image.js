import React ,{useState,useEffect} from 'react'
import {Text,Image,View,Dimensions} from 'react-native';
import styles from './style'
import { PinchGestureHandler } from 'react-native-gesture-handler';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
import ImageZoom from 'react-native-image-pan-zoom';
export default function image({route}) {
    const {url} = route.params;
    const [scale, setscale] = useState(1)
    onPinchGestureEvent = event => {setscale(event.nativeEvent.scale)}
    return (<View style={styles.wrapper}>
                  <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/8161208541"
  onAdFailedToLoad={error => console.error(error)}
/>
        <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={Dimensions.get('screen').width}
                       imageHeight={Dimensions.get('screen').height}>
            <Image  style={[styles.wrapper,{transform:[{scale:scale}]}]}  source={{uri:url}} resizeMode="contain" />
            </ImageZoom>
            <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/4724488422"
  onAdFailedToLoad={error => console.error(error)}
/>
        </View>
    )
}
