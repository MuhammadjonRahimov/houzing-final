import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const mapStyle = {
    position: 'relative',
    top: '0',
    left: '0',
    width: '100%',
    maxWidth: '880px',
    height: '416px',
    overflow: 'hidden',
}

const Yandex = () => {
    return (
        <YMaps>
            <div>
                <Map style={mapStyle} defaultState={{ center: [41.369760, 69.317610], zoom: 7 }}>
                    <Placemark geometry={[41.369760, 69.317610]} />
                </Map>
            </div>
        </YMaps>
    )
}

export default Yandex;