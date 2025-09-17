import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { product_add_action, Product_edite_get, product_edite_action } from '../Redux/action';

const Product_add = () => {
    const dispatch = useDispatch();
    const product_edite = useSelector(state => state.Product_edite_getting?.edite_data || {});
    console.log("Edit data:", product_edite);

    const [update, setupdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("link"); // 'link' or 'upload'

    const [state, setstate] = useState({
        id: "",
        name: "",
        Image: "",
        title: "",
        des: "",
        rating: "",
        price: "",
        weight: "",
        tag: "",
        category: ""
    });

    const [imageLink, setImageLink] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (product_edite && product_edite.message) {
            const productData = product_edite.message;
            console.log("Setting form with:", productData);

            setstate({
                id: productData._id || "",
                name: productData.name || "",
                Image: productData.Image || "",
                title: productData.title || "",
                des: productData.des || "",
                rating: productData.rating || "",
                price: productData.price || "",
                weight: productData.weight || "",
                tag: productData.tag || "",
                category: productData.category || ""
            });

            setImageLink(productData.Image || "");
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
                Image: imageLink.trim(),
            }));
            setImageLink("");
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

            // Create a preview URL
            const previewUrl = URL.createObjectURL(file);
            setstate(prev => ({
                ...prev,
                Image: previewUrl,
            }));
        }
    };

    const uploadImageToServer = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:9595/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            return data.imageUrl; // Server should return the URL of the uploaded image
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const removeImage = () => {
        if (state.Image.startsWith('blob:')) {
            URL.revokeObjectURL(state.Image);
        }
        setstate(prev => ({
            ...prev,
            Image: "",
        }));
        setImageLink("");
        setSelectedFile(null);
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!state.name || !state.Image) {
            alert("Please provide at least a name and one image");
            setLoading(false);
            return;
        }

        let finalImageUrl = state.Image;

        // If a file was selected, upload it first
        if (selectedFile && state.Image.startsWith('blob:')) {
            try {
                setUploadProgress(50);
                finalImageUrl = await uploadImageToServer(selectedFile);
                setUploadProgress(100);
            } catch (error) {
                alert("Image upload failed: " + error.message);
                setLoading(false);
                setUploadProgress(0);
                return;
            }
        }

        // Prepare data according to your schema
        const productData = {
            name: state.name,
            Image: finalImageUrl,
            title: state.title,
            des: state.des,
            rating: state.rating,
            price: state.price,
            weight: state.weight,
            tag: state.tag,
            category: state.category
        };

        console.log("Submitting:", update ? "UPDATE" : "CREATE", productData);

        try {
            if (update) {
                await dispatch(product_edite_action(state.id, productData));
                alert("Product updated successfully!");
            } else {
                await dispatch(product_add_action(productData));
                alert("Product added successfully!");
            }

            // Reset form
            setstate({
                id: "",
                name: "",
                Image: "",
                title: "",
                des: "",
                rating: "",
                price: "",
                weight: "",
                tag: "",
                category: ""
            });
            setImageLink("");
            setSelectedFile(null);
            setUploadProgress(0);
            setupdate(false);

        } catch (error) {
            console.error("Submission error:", error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl mt-8 mb-10">
            <form onSubmit={handlesubmit} className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    {update ? "Update Product" : "Add New Product"}
                </h2>

                {/* Debug info */}
                {update && (
                    <div className="bg-yellow-100 p-2 rounded text-sm">
                        Editing Product ID: {state.id}
                    </div>
                )}

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name <span className="text-red-500">*</span></label>
                    <input
                        name="name"
                        value={state.name}
                        onChange={handlechange}
                        className="w-full border px-4 py-2 rounded-lg"
                        placeholder="Enter product name"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Product Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Title</label>
                    <input
                        name="title"
                        value={state.title}
                        onChange={handlechange}
                        className="w-full border px-4 py-2 rounded-lg"
                        placeholder="Enter product title"
                        disabled={loading}
                    />
                </div>

                {/* Image Upload Tabs */}
                <div>
                    <div className="flex border-b mb-4">
                        <button
                            type="button"
                            onClick={() => setActiveTab('link')}
                            className={`px-4 py-2 ${activeTab === 'link' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                        >
                            Image URL
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('upload')}
                            className={`px-4 py-2 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                        >
                            Upload Image
                        </button>
                    </div>

                    {activeTab === 'link' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Image URL <span className="text-red-500">*</span></label>
                            <div className="flex mt-1">
                                <input
                                    value={imageLink}
                                    onChange={(e) => setImageLink(e.target.value)}
                                    className="flex-1 border px-3 py-2 rounded-l"
                                    placeholder="Paste image URL"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={handleImageLink}
                                    className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 disabled:bg-gray-400"
                                    disabled={loading}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'upload' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Image <span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="w-full border px-3 py-2 rounded"
                                disabled={loading}
                            />
                            <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, GIF</p>
                        </div>
                    )}
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                )}

                {/* Image Preview */}
                {state.Image && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
                        <div className="relative inline-block">
                            <img
                                src={state.Image}
                                alt="Preview"
                                className="h-40 object-cover rounded border"
                                onError={(e) => {
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23999'%3EInvalid Image%3C/text%3E%3C/svg%3E";
                                }}
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                disabled={loading}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                )}

                {/* Other Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                        <input
                            type="number"
                            name="rating"
                            value={state.rating}
                            onChange={handlechange}
                            className="w-full border px-4 py-2 rounded"
                            min="1"
                            max="5"
                            step="0.1"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={state.price}
                            onChange={handlechange}
                            className="w-full border px-4 py-2 rounded"
                            step="0.01"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Weight</label>
                        <input
                            type="text"
                            name="weight"
                            value={state.weight}
                            onChange={handlechange}
                            className="w-full border px-4 py-2 rounded"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={state.category}
                            onChange={handlechange}
                            className="w-full border px-4 py-2 rounded"
                            disabled={loading}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="des"
                        value={state.des}
                        onChange={handlechange}
                        className="w-full border px-4 py-2 rounded"
                        rows="3"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tag</label>
                    <input
                        type="text"
                        name="tag"
                        value={state.tag}
                        onChange={handlechange}
                        className="w-full border px-4 py-2 rounded"
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "Processing..." : (update ? "Update Product" : "Add Product")}
                </button>
            </form>
        </div>
    );
};

export default Product_add;