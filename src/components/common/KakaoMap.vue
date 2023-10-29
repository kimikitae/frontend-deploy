<template>
    <div id="map"></div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: "KakaoMap",
    data() {
        return {
            // map: null,
        }
    },
    computed: {
        // 내 주소
        ...mapState("user", {
            addresses: (state) => state.addresses,
        }),
        // 공유 주소
        ...mapState("post", {
            pshare: (state) => state.post.place,
        }),
    },
    methods: {
        ...mapMutations("post", ["setEnable"]),
        loadScript() {
            const script = document.createElement("script");
            // 해당 앱키의 값은 추후 변경해야할것(현재 테스트용으로 개인키 입력)
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=0b9ba6edae8ef3eeaf2fb3f041d909f0&autoload=false&libraries=services"
            script.onload = () => window.kakao.maps.load(this.loadMap);
            document.head.appendChild(script);
        },
        async loadMap() {
            var positions = [
                {
                    title: '내 위치',
                },
                {
                    title: '공유 장소',
                },
            ];

            var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
                mapOption = {
                    center: new window.kakao.maps.LatLng(35.454078303743316, 128.80681010423675), // 지도의 중심좌표
                    level: 6 // 지도의 확대 레벨
                };

            var map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new window.kakao.maps.services.Geocoder();

            // 내위치 세팅
            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(this.addresses[0].address, function (result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === window.kakao.maps.services.Status.OK) {
                    positions[0].latlng = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    // 마커 이미지의 이미지 주소입니다
                    var imageSrc = "src/assets/maker.png"
                    var imageSize = new window.kakao.maps.Size(30, 40);
                    var imageOption = { offset: new window.kakao.maps.Point(0, 0) };

                    // 마커 이미지를 생성합니다    
                    var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

                    // 마커를 생성합니다
                    var marker = new window.kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: positions[0].latlng, // 마커의 위치
                        title: positions[0].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image: markerImage // 마커 이미지 
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);

                    var content =
                        '<div class="customoverlay" > ' +
                        positions[0].title +
                        '</div>';

                    // 커스텀 오버레이가 표시될 위치입니다 
                    var position = positions[0].latlng;

                    // 커스텀 오버레이를 생성합니다
                    var customOverlay = new window.kakao.maps.CustomOverlay({
                        map: map,
                        position: position,
                        content: content,
                        yAnchor: 1
                    });
                    console.log(customOverlay)

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(positions[0].latlng);

                }
            });

            // 공유 위치 세팅
            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(this.pshare, function (result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === window.kakao.maps.services.Status.OK) {
                    positions[1].latlng = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    // 마커 이미지의 이미지 주소입니다
                    var imageSrc = "src/assets/maker.png"
                    var imageSize = new window.kakao.maps.Size(30, 40);
                    var imageOption = { offset: new window.kakao.maps.Point(0, 0) };

                    // 마커 이미지를 생성합니다    
                    var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

                    // 마커를 생성합니다
                    var marker = new window.kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: positions[1].latlng, // 마커의 위치
                        title: positions[1].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image: markerImage // 마커 이미지 
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);

                    var content =
                        '<div class="customoverlay" > ' +
                        positions[1].title +
                        '</div>';

                    // 커스텀 오버레이가 표시될 위치입니다 
                    var position = positions[1].latlng;

                    // 커스텀 오버레이를 생성합니다
                    var customOverlay = new window.kakao.maps.CustomOverlay({
                        map: map,
                        position: position,
                        content: content,
                        yAnchor: 1
                    });
                    console.log(customOverlay)

                    var polyline = new window.kakao.maps.Polyline({
                        path: [
                            positions[0].latlng,
                            positions[1].latlng
                        ],
                        strokeWeight: 2,
                        strokeColor: '#FF00FF',
                        strokeOpacity: 0.8,
                        strokeStyle: 'dashed'
                    });
                    const dist = Math.floor(polyline.getLength());

                    if(dist < 3000){
                        this.setEnable(true)
                    } else{
                        this.setEnable(false)
                    }
                }
            });



        },
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            console.log("if")
            this.loadMap();
        } else {
            console.log("else")
            this.loadScript();
        }
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>