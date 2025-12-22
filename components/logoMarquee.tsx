import React from 'react';
import { Marquee } from './ui/marquee';

const LogoMarquee = () => {
    const logo=[
{
    src: '/asana.png',
        alt: 'asana',
        width: 150,
        height: 75,
},
{
    src: '/alipay.png',
        alt: 'alipay',
        width: 150,
        height: 75,
},
{
    src: '/amazon.png',
        alt: 'amazon',
        width: 150,
        height: 75,
},
{
    src: '/drive.png',
        alt: 'drive',
        width: 150,
        height: 75,
},
    ]
        

    

    return (
        <div>
            <Marquee className="bg-white py-8 [--duration:20s]" repeat={4} pauseOnHover={true} reverse={false} >
                {logo.map((item, index) => (
                    <div key={index} className="mx-8 flex items-center">
                        <img
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            className="object-contain"
                        />
                    </div>
                ))}
            </Marquee>
              
            
        </div>
    );
};

export default LogoMarquee;