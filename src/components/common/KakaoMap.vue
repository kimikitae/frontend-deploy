<template>
    <div id="map"></div>
</template>

<script>
export default {
    name: "KakaoMap",
    data() {
        return {
            map: null,
            list: [{
                latitude: "37.39843974939604",
                longitude: "127.10972941510465",
            },
            {
                latitude: "37.32133321",
                longitude: "127.432432",
            }
            ]
        }
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            // console.log("if")
            this.loadMap();
        } else {
            // console.log("else")
            this.loadScript();
        }
    },
    methods: {
        loadScript() {
            const script = document.createElement("script");
            // 해당 앱키의 값은 추후 변경해야할것(현재 테스트용으로 개인키 입력)
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=0b9ba6edae8ef3eeaf2fb3f041d909f0&autoload=false&libraries=services"
            script.onload = () => window.kakao.maps.load(this.loadMap);
            document.head.appendChild(script);
        },
        loadMap() {
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
                mapOption = {
                    center: new window.kakao.maps.LatLng(35.454078303743316, 128.80681010423675), // 지도의 중심좌표
                    level: 4 // 지도의 확대 레벨
                };

            this.map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

            var positions = [
                {
                    title: '내 위치',
                    latlng: new window.kakao.maps.LatLng(35.454078303743316, 128.80681010423675)
                },
                {
                    title: '오칠구 포차',
                    latlng: new window.kakao.maps.LatLng(35.45403078770194, 128.80561956108846)
                },
            ];

            // 마커 이미지의 이미지 주소입니다
            var imageSrc = "src/assets/maker.png"
            var imageSize = new window.kakao.maps.Size(30, 40);
            var imageOption = { offset: new window.kakao.maps.Point(0, 0) };

            for (var i = 0; i < positions.length; i++) {
                // 마커 이미지의 이미지 크기 입니다

                // 마커 이미지를 생성합니다    
                var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

                // 마커를 생성합니다
                var marker = new window.kakao.maps.Marker({
                    map: this.map, // 마커를 표시할 지도
                    position: positions[i].latlng, // 마커의 위치
                    title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image: markerImage // 마커 이미지 
                });
                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(this.map);

                var content =
                    '<div class="customoverlay" > ' +
                        positions[i].title +
                    '</div>';

                // 커스텀 오버레이가 표시될 위치입니다 
                var position = positions[i].latlng;

                // 커스텀 오버레이를 생성합니다
                var customOverlay = new window.kakao.maps.CustomOverlay({
                    map: this.map,
                    position: position,
                    content: content,
                    yAnchor: 1
                });

                console.log(customOverlay)
            }
        },
    }
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>