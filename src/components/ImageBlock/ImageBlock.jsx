import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { CircularProgress } from '@mui/material';
import { MousePointerClick, X } from 'lucide-react';
import './ImageBlock.css';

const ImageBlock = ({ src, alt, tooltipTitle, tooltipDescription, style }) => {
  const [loading, setLoading] = useState(true);
  const [inView, setInView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`overflow-hidden rounded-lg relative image-block-container cursor-pointer ${
          inView ? 'image-slide-up-container' : ''
        }`}
        style={style}
        ref={imageRef}
      >
        {loading && (
          <div className="image-loader">
            <CircularProgress style={{ color: 'white' }} />
          </div>
        )}
        <div className="image-zoom-wrapper">
          <img
            src={src}
            alt={alt}
            loading="eager"
            onLoad={handleImageLoad}
            className={`rounded-lg shadow-lg bg-black bg-opacity-80 border-1 border-black image-zoom ${
              loading ? 'invisible' : ''
            }`}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '250px',
              objectFit: 'cover',
            }}
          />
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <MousePointerClick className="text-white w-8 h-8 mb-2" />
            <span className="text-white text-sm font-medium">คลิกเพื่อดูรายละเอียด</span>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        size="2xl"
        backdrop="blur"
        className="modal-custom"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center border-b pb-4">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-white">{tooltipTitle}</h2>
                  <p className="text-sm text-gray-500 mt-1">Character Profile</p>
                </div>
              </ModalHeader>
              <ModalBody className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                      style={{
                        maxHeight: '400px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent rounded-b-xl" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="p-2 bg-gray rounded-lg">
                        <h3 className="text-lg font-bold text-white mb-2">รายละเอียดตัวละคร</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {tooltipDescription}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                          Character
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                          Stage Play
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="border-t pt-4">
                <Button 
                  color="danger" 
                  variant="flat" 
                  onPress={onClose}
                  className="hover:bg-red-600"
                >
                  ปิด
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageBlock;