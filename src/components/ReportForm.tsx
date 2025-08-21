import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, Send } from 'lucide-react';
import { PollutionSpot } from '../types';
import { hamburgDistricts } from '../data/mockData';

interface ReportFormProps {
  onSubmit: (spot: Omit<PollutionSpot, 'id' | 'votes' | 'reportedAt'>) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'trash' as PollutionSpot['type'],
    severity: 'medium' as PollutionSpot['severity'],
    description: '',
    address: '',
    district: '',
    reporterName: '',
    imageFile: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would get actual coordinates from address or user location
    const mockCoordinates = {
      lat: 53.5411 + (Math.random() - 0.5) * 0.1,
      lng: 9.9937 + (Math.random() - 0.5) * 0.1,
    };

    onSubmit({
      location: {
        ...mockCoordinates,
        address: `${formData.address}, ${formData.district}`,
      },
      type: formData.type,
      severity: formData.severity,
      description: formData.description,
      reportedBy: formData.reporterName || 'Anonymous',
      status: 'reported',
      imageUrl: imagePreview || undefined,
    });

    // Reset form
    setFormData({
      type: 'trash',
      severity: 'medium',
      description: '',
      address: '',
      district: '',
      reporterName: '',
      imageFile: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
        <div className="p-6 bg-gradient-to-r from-elbe-blue to-blue-600 dark:from-blue-800 dark:to-blue-900 text-white">
          <h2 className="text-3xl font-bold mb-2">Report Pollution</h2>
          <p className="text-blue-100">Help us identify areas that need cleaning</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Pollution Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pollution Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['plastic', 'chemical', 'trash', 'oil', 'other'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type as any })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.type === type
                      ? 'border-elbe-blue dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-elbe-blue dark:text-blue-400'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 dark:text-gray-300'
                  }`}
                >
                  <span className="block text-2xl mb-1">
                    {type === 'plastic' ? '🥤' :
                     type === 'chemical' ? '⚗️' :
                     type === 'trash' ? '🗑️' :
                     type === 'oil' ? '🛢️' : '❓'}
                  </span>
                  <span className="text-sm capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Severity Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, severity: level as any })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.severity === level
                      ? level === 'high' ? 'border-red-500 bg-red-50 text-red-600' :
                        level === 'medium' ? 'border-yellow-500 bg-yellow-50 text-yellow-600' :
                        'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 dark:text-gray-300'
                  }`}
                >
                  <AlertTriangle className={`h-5 w-5 mx-auto mb-1 ${
                    formData.severity === level
                      ? level === 'high' ? 'text-red-600' :
                        level === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      : 'text-gray-400'
                  }`} />
                  <span className="text-sm capitalize">{level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Street Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-elbe-blue focus:border-transparent"
                placeholder="e.g., Landungsbrücken 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                District
              </label>
              <select
                required
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-elbe-blue focus:border-transparent"
              >
                <option value="">Select a district</option>
                {hamburgDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elbe-blue focus:border-transparent"
              rows={4}
              placeholder="Describe the pollution you've found..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Camera className="inline h-4 w-4 mr-1" />
              Photo (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, imageFile: null });
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <>
                    <Camera className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-elbe-blue dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        <span>Upload a photo</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Reporter Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={formData.reporterName}
              onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elbe-blue focus:border-transparent"
              placeholder="Leave blank to report anonymously"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Submit Report</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
