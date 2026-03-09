'use client';

import { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push } from 'firebase/database';
import { database, storage } from '@/lib/firebase';

export default function UploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('artworks');
  const [videoUrl, setVideoUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isForSale = category !== 'documentaries';

  useEffect(() => {
    if (!isForSale) {
      setPrice('');
    }
  }, [isForSale]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !description || !image) {
      setError('Please add a title, description, and image.');
      return;
    }

    if (isForSale && !price) {
      setError('Please add a price for pieces that are available to purchase.');
      return;
    }

    if (!isForSale && !videoUrl.trim()) {
      setError('Please add a YouTube or video link for documentary uploads.');
      return;
    }

    setIsLoading(true);

    try {
      const imageRef = ref(storage, `${category}/${Date.now()}-${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      const entryRef = dbRef(database, category);
      await push(entryRef, {
        title,
        description,
        imageUrl,
        category,
        createdAt: new Date().toISOString(),
        ...(isForSale ? { price: parseFloat(price) } : {}),
        ...(videoUrl.trim() ? { videoUrl: videoUrl.trim() } : {}),
      });

      setSuccess('Your entry was uploaded successfully.');
      setTitle('');
      setDescription('');
      setPrice('');
      setVideoUrl('');
      setImage(null);
    } catch (uploadError) {
      console.error(uploadError);
      setError('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-[2rem] border border-red-100 bg-white p-8 shadow-sm sm:p-10">
      <div className="mb-8 space-y-3">
        <p className="text-[0.68rem] uppercase tracking-[0.35em] text-red-600">Upload</p>
        <h2 className="text-3xl font-light tracking-tight text-stone-900">Add new SweetPear content</h2>
        <p className="text-sm leading-relaxed text-stone-600">
          Upload artwork, collages, or documentary stills with a clear description. Documentary uploads can also store a video link.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-[1.25rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-[1.25rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block rounded-[1.5rem] border border-dashed border-red-100 bg-red-50/40 p-8 text-center transition hover:border-red-200">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <Upload className="mx-auto mb-4 text-red-500" size={28} />
          <span className="text-sm uppercase tracking-[0.28em] text-stone-600">
            {image ? image.name : 'Choose cover image'}
          </span>
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-500">
              Category
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-full border border-red-100 px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-red-300"
            >
              <option value="artworks">Handmade Art</option>
              <option value="collages">Conceptual Collages</option>
              <option value="documentaries">Documentaries / Vlogs</option>
            </select>
          </div>

          {isForSale ? (
            <div className="space-y-2">
              <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-500">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Price in USD"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full rounded-full border border-red-100 px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-red-300"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-500">
                Video Link
              </label>
              <input
                type="url"
                placeholder="YouTube or video URL"
                value={videoUrl}
                onChange={(event) => setVideoUrl(event.target.value)}
                className="w-full rounded-full border border-red-100 px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-red-300"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-500">
            Title
          </label>
          <input
            type="text"
            placeholder="Entry title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-full border border-red-100 px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-red-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-500">
            Description
          </label>
          <textarea
            placeholder="Write the essence of the piece, what it means to you, or how you want it to be seen."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            className="w-full rounded-[1.5rem] border border-red-100 px-4 py-4 text-sm leading-relaxed text-stone-700 outline-none transition focus:border-red-300"
          />
        </div>

        {isForSale && (
          <div className="space-y-2">
            <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-500">
              Poster / souvenir note
            </label>
            <p className="rounded-[1.25rem] border border-red-100 bg-red-50/40 px-4 py-4 text-sm text-stone-600">
              Collages and handmade works will appear in the shop with Stripe-ready pricing and their written description.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex rounded-full bg-red-600 px-6 py-3 text-[0.72rem] uppercase tracking-[0.3em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
        >
          {isLoading ? 'Uploading...' : 'Publish Entry'}
        </button>
      </form>
    </div>
  );
}
