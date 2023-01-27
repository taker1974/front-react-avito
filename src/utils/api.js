import base64 from "base-64";

class Api {
    constructor(options) {
        this._url = options.url;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    //user
    getUserInfo = async (username, password) => {
        return await fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        }).then(this._handleResponse);
    };

    getUsersAds = async (username, password) => {
        return await fetch(`${this._url}/ads/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        }).then(this._handleResponse);
    };

    updateUser(data, username, password) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            //credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        }).then(this._handleResponse);
    }

    updateUserPhoto(image, username, password) {
        const formData = new FormData();
        formData.append("image", image);
        return fetch(`${this._url}/users/me`, formData, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        }).then(this._handleResponse);
    }

    //comment|comments
    getComments(ad_pk, username, password) {
        return fetch(`${this._url}/ads/${ad_pk}/comments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        }).then(this._handleResponse);
    }

    getComment(adId, commentId, username, password) {
        return fetch(`${this._url}/ads/${adId}/comments/${commentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        }).then(this._handleResponse);
    }

    addComment(id, text, username, password) {
        return fetch(`${this._url}/ads/${id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
            body: JSON.stringify(text),
        }).then(this._handleResponse);
    }

    editComment(adId, commentId, data, username, password) {
        return fetch(`${this._url}/ads/${adId}/comments/${commentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
            body: JSON.stringify(data),
        }).then(this._handleResponse);
    }

    deleteComment(adId, commentId, username, password) {
        return fetch(`${this._url}/ads/${adId}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        });
    }

    //ads
    getAds() {
        return fetch(`${this._url}/ads`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(this._handleResponse);
    }

    getHiddenAds(username, password) {
        return fetch(`${this._url}/ads`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        }).then(this._handleResponse);
    }

    addAd({image, title, price, description}, username, password) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append('properties', new Blob([JSON.stringify({
            "title": `${title}`,
            "price": `${price}`,
            "description": `${description}`
        })], {
            type: "application/json"
        }));

        return fetch(`${this._url}/ads`, {
            method: "POST",
            headers: {
                type: "application/json",

                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
            body: formData,
        }).then(this._handleResponse);
    }

    //get Ad
    getAd(id, username, password) {
        return fetch(`${this._url}/ads/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        }).then(this._handleResponse);
    }

    //edit ad
    editAdd(id, data, username, password) {
        return fetch(`${this._url}/ads/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
            body: JSON.stringify(data),
        }).then(this._handleResponse);
    }

    editAddPhoto(id, image, username, password) {
        const formData = new FormData();
        formData.append("image", image);
        return fetch(`${this._url}/ads/${id}`, formData, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        }).then(this._handleResponse);
    }

    //delite add
    deleteAdd(id, username, password) {
        return fetch(`${this._url}/ads/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64.encode(`${username}:${password}`),
            },
        });
    }
}

const api = new Api({
    url: "http://localhost:8080",
});

export default api;
