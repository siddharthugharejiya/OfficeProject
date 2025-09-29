// ✅ Updated Product_add.jsx with Multiple Image Upload (Link + File)
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { product_add_action, Product_edite_get, product_edite_action } from '../Redux/action';

const Product_add = () => {
    const dispatch = useDispatch();
    const product_edite = useSelector(state => state.Product_edite_getting?.edite_data || {});
    // console.log(product_edite);

    const [update, setupdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("link");
    const [imageLink, setImageLink] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [state, setstate] = useState({
        id: "",
        name: "",
        Image: [],
        title: "",
        des: "",
        rating: "",
        price: "",
        weight: "",
        tag: "",
        category: ""
    });

    useEffect(() => {
        if (product_edite && product_edite.data) {
            const productData = product_edite.data;

            setstate({
                id: productData._id || "",
                name: productData.name || "",
                Image: Array.isArray(productData.Image) ? productData.Image : [],
                title: productData.title || "",
                des: productData.des || "",
                rating: productData.rating || "",
                price: productData.price || "",
                weight: productData.weight || "",
                tag: productData.tag || "",
                category: productData.category || ""
            });

            if (Array.isArray(productData.Image)) {
                const previews = productData.Image.map(url => ({ file: null, preview: url }));
                setSelectedFiles(previews);
            } else {
                setSelectedFiles([]);
            }

            setupdate(true);
        }
    }, [product_edite]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setstate(prev => ({ ...prev, [name]: value }));
    };

    const handleImageLink = (e) => {
        e.preventDefault();
        if (imageLink.trim() !== "") {
            setstate(prev => ({
                ...prev,
                Image: [...prev.Image, imageLink.trim()],
            }));
            setImageLink("");
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setSelectedFiles(prev => [...prev, ...previews]);
        setstate(prev => ({
            ...prev,
            Image: [...prev.Image, ...previews.map(p => p.preview)]
        }));
    };

    const uploadAllImages = async () => {
        const urls = [];
        for (const imgObj of selectedFiles) {
            // Skip images added via link (file is null)
            if (!imgObj.file) {
                urls.push(imgObj.preview);
                continue;
            }

            const formData = new FormData();
            formData.append('image', imgObj.file);

            const response = await fetch('https://officeproject-backend.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            urls.push(data.imageUrl);
        }
        return urls;
    };

    const removeImage = (index) => {
        const newImages = [...state.Image];
        newImages.splice(index, 1);
        setstate(prev => ({ ...prev, Image: newImages }));

        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);
        setSelectedFiles(newSelectedFiles);
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!state.name || state.Image.length === 0) {
            alert("Please provide at least a name and one image");
            setLoading(false);
            return;
        }

        let finalImageUrls = [...state.Image];

        if (selectedFiles.length > 0) {
            try {
                setUploadProgress(50);
                finalImageUrls = await uploadAllImages();
                setUploadProgress(100);
            } catch (error) {
                alert("Image upload failed: " + error.message);
                setLoading(false);
                setUploadProgress(0);
                return;
            }
        }

        const productData = {
            ...state,
            Image: finalImageUrls
        };

        try {
            if (update) {
                await dispatch(product_edite_action(state.id, productData));
            } else {
                await dispatch(product_add_action(productData));
            }

            setstate({
                id: "",
                name: "",
                Image: [],
                title: "",
                des: "",
                rating: "",
                price: "",
                weight: "",
                tag: "",
                category: ""
            });
            setImageLink("");
            setSelectedFiles([]);
            setUploadProgress(0);
            setupdate(false);
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl mt-8 mb-10">
            <form onSubmit={handlesubmit} className="space-y-8">
                <h2 className="text-4xl font-bold text-center text-white mb-4">
                    {update ? "Update Product" : "Add New Product"}
                </h2>

                <div>
                    <label className="text-white">Product Name</label>
                    <input name="name" value={state.name} onChange={handlechange} required className="w-full p-2 rounded bg-white/10 text-white" />
                </div>

                <div className="flex gap-4">
                    <button type="button" onClick={() => setActiveTab('link')} className={`px-4 py-2 rounded ${activeTab === 'link' ? 'bg-pink-600 text-white' : 'bg-white/10 text-white'}`}>Image URL</button>
                    <button type="button" onClick={() => setActiveTab('upload')} className={`px-4 py-2 rounded ${activeTab === 'upload' ? 'bg-pink-600 text-white' : 'bg-white/10 text-white'}`}>Upload</button>
                </div>

                {activeTab === 'link' && (
                    <div className="flex gap-2">
                        <input value={imageLink} onChange={(e) => setImageLink(e.target.value)} className="flex-1 p-2 rounded bg-white/10 text-white" placeholder="Paste Image URL" />
                        <button onClick={handleImageLink} type="button" className="bg-pink-600 text-white px-4 py-2 rounded">Add</button>
                    </div>
                )}

                {activeTab === 'upload' && (
                    <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="text-white" />
                )}

                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                        <div className="bg-pink-500 h-2" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                )}

                {state.Image.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                        {state.Image.map((img, idx) => (
                            <div key={idx} className="relative group">
                                <img src={img} className="h-24 w-24 object-cover rounded border" />
                                <button type="button" onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2">×</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Other Fields */}
                <div><textarea name="des" value={state.des} onChange={handlechange} className="w-full p-2 rounded bg-white/10 text-white" placeholder="Description" /></div>

                <div>
                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>

                        <select
                            id="category"
                            onChange={handlechange}
                            value={state.category}
                            name="category"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option value="">Select a category</option>
                            <option value="One Piece Closet">One Piece Closet</option>
                            <option value="Wall Hung Closet">Wall Hung Closet</option>
                            <option value="Water Closet">Water Closet</option>
                            <option value="Table Top Basin">Table Top Basin</option>
                            <option value="One Piece Basin">One Piece Basin</option>
                            <option value="Counter Basin">Counter Basin</option>
                            <option value="Basin With Pedestal">Basin With Pedestal</option>
                            <option value="Basin With Half Pedestal">Basin With Half Pedestal</option>
                            <option value="Wall Hung Basin">Wall Hung Basin</option>
                            <option value="Urinal">Urinal</option>
                            <option value="Pan">Pan</option>
                            <option value="Pastel Series">Pastel Series</option>
                        </select>
                    </div>
                </div>
                <div><input name="tag" value={state.tag} onChange={handlechange} className="w-full p-2 rounded bg-white/10 text-white" placeholder="Tag" /></div>

                <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded text-lg mt-4" disabled={loading}>
                    {loading ? "Processing..." : update ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default Product_add;
