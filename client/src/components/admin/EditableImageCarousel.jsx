import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { resolveUploadedAssetUrl } from '../../utils/uploadUrls';
import { uploadAsset, getUploadErrorMessage } from '../../utils/uploadClient';
import ImageCarousel from '../ImageCarousel';

const EditableImageCarousel = ({ urls = [], onSave, alt = "Carousel Image" }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const validUrls = Array.isArray(urls) ? urls.filter(u => typeof u === 'string' && u.trim() !== '') : [];

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      setError('');
      const newUrls = [...validUrls];

      for (let i = 0; i < files.length; i++) {
        const response = await uploadAsset({
          endpoint: "/upload/image",
          fieldName: "image",
          file: files[i],
        });
        const uploadedUrl =
          response.data?.fileUrl || response.data?.url || response.data?.data?.fileUrl || "";
        if (uploadedUrl) newUrls.push(uploadedUrl);
      }

      onSave(newUrls);
    } catch (err) {
      setError(getUploadErrorMessage(err, "Multiple image upload failed."));
    } finally {
      setUploading(false);
    }
  };

  const removeUrl = (index) => {
    const newUrls = [...validUrls];
    newUrls.splice(index, 1);
    onSave(newUrls);
  };

  return (
    <div className="space-y-3">
      {error && <div className="text-xs text-red-600 bg-red-50 p-2 rounded">{error}</div>}
      
      {validUrls.length > 0 ? (
        <div className="relative">
          <ImageCarousel images={validUrls} alt={alt} className="w-full aspect-[16/10] rounded-lg object-cover border border-gray-100" />
          <div className="flex flex-wrap gap-2 mt-2">
            {validUrls.map((url, i) => (
              <div key={i} className="relative group w-16 h-12">
                <img src={resolveUploadedAssetUrl(url)} alt="thumb" className="w-full h-full object-cover rounded border" />
                <button 
                  onClick={() => removeUrl(i)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded p-1 opacity-0 group-hover:opacity-100 text-[10px]"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full aspect-[16/10] rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-sm text-gray-500">
          No images in carousel
        </div>
      )}

      <div className="mt-2">
        <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded cursor-pointer hover:bg-blue-100 transition-colors">
          <FaPlus /> {uploading ? "Uploading..." : "Upload Images"}
          <input type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>
    </div>
  );
};

export default EditableImageCarousel;
