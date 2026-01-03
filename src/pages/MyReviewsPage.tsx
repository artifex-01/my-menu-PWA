import React, { useState } from 'react'
import { IonPage, IonContent, IonIcon, IonAlert, IonModal } from '@ionic/react'
import { chevronBack, star, trash, chatbubbleEllipses, pencil, close } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './MyReviewsPage.css'

interface Review {
    id: string
    restaurantName: string
    restaurantImage: string
    rating: number
    text: string
    date: string
    images?: string[]
}

const MyReviewsPage: React.FC = () => {
    const history = useHistory()
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingReview, setEditingReview] = useState<Review | null>(null)
    const [editText, setEditText] = useState('')
    const [editRating, setEditRating] = useState(5)

    const [reviews, setReviews] = useState<Review[]>([
        {
            id: '1',
            restaurantName: 'Burger Hub',
            restaurantImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200',
            rating: 5,
            text: 'Amazing burgers! The truffle burger was absolutely divine. Fast service and the fries were perfectly crispy. Will definitely come back!',
            date: 'Dec 15, 2024',
            images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200']
        },
        {
            id: '2',
            restaurantName: 'The Pasta Place',
            restaurantImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200',
            rating: 4,
            text: 'Great pasta, authentic Italian flavors. The carbonara was creamy and delicious. A bit pricey but worth it for special occasions.',
            date: 'Dec 10, 2024'
        },
        {
            id: '3',
            restaurantName: 'Tokyo Sushi Bar',
            restaurantImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
            rating: 5,
            text: 'Fresh sushi, excellent presentation. The salmon roll melted in my mouth. Staff was very friendly and attentive.',
            date: 'Nov 28, 2024',
            images: [
                'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
                'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=200'
            ]
        }
    ])

    const handleDeleteClick = (reviewId: string) => {
        setSelectedReviewId(reviewId)
        setShowDeleteAlert(true)
    }

    const confirmDelete = () => {
        if (selectedReviewId) {
            setReviews(reviews.filter(r => r.id !== selectedReviewId))
        }
        setShowDeleteAlert(false)
        setSelectedReviewId(null)
    }

    const handleEditClick = (review: Review) => {
        setEditingReview(review)
        setEditText(review.text)
        setEditRating(review.rating)
        setShowEditModal(true)
    }

    const saveEdit = () => {
        if (editingReview) {
            setReviews(reviews.map(r =>
                r.id === editingReview.id
                    ? { ...r, text: editText, rating: editRating }
                    : r
            ))
        }
        setShowEditModal(false)
        setEditingReview(null)
    }

    const renderStars = (rating: number, interactive = false) => {
        return Array(5).fill(0).map((_, i) => (
            <IonIcon
                key={i}
                icon={star}
                className={`review-star ${i < rating ? '' : 'empty'} ${interactive ? 'clickable' : ''}`}
                onClick={interactive ? () => setEditRating(i + 1) : undefined}
            />
        ))
    }

    return (
        <IonPage>
            <IonContent className="reviews-page-content" fullscreen>
                {/* Header */}
                <div className="reviews-header">
                    <button className="reviews-back-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={chevronBack} />
                    </button>
                    <h1 className="reviews-title">My Reviews</h1>
                    <div className="header-spacer"></div>
                </div>

                {/* Reviews List */}
                <div className="reviews-list">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review.id} className="review-card">
                                {/* Restaurant Info */}
                                <div className="review-restaurant-row">
                                    <img src={review.restaurantImage} alt={review.restaurantName} className="review-restaurant-image" />
                                    <div className="review-restaurant-info">
                                        <h3 className="review-restaurant-name">{review.restaurantName}</h3>
                                        <span className="review-date">{review.date}</span>
                                    </div>
                                    <div className="review-action-btns">
                                        <button className="review-edit-btn" onClick={() => handleEditClick(review)}>
                                            <IonIcon icon={pencil} />
                                        </button>
                                        <button className="review-delete-btn" onClick={() => handleDeleteClick(review.id)}>
                                            <IonIcon icon={trash} />
                                        </button>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="review-rating-row">
                                    {renderStars(review.rating)}
                                </div>

                                {/* Review Text */}
                                <p className="review-text">{review.text}</p>

                                {/* Review Images */}
                                {review.images && review.images.length > 0 && (
                                    <div className="review-images">
                                        {review.images.map((img, idx) => (
                                            <img key={idx} src={img} alt={`Review ${idx + 1}`} className="review-image-thumb" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="empty-reviews">
                            <div className="empty-icon-circle">
                                <IonIcon icon={chatbubbleEllipses} />
                            </div>
                            <h3>No Reviews Yet</h3>
                            <p>Your reviews will appear here after you rate a restaurant.</p>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Alert */}
                <IonAlert
                    isOpen={showDeleteAlert}
                    onDidDismiss={() => setShowDeleteAlert(false)}
                    header="Delete Review"
                    message="Are you sure you want to delete this review? This action cannot be undone."
                    cssClass="delete-confirm-alert"
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary'
                        },
                        {
                            text: 'Delete',
                            role: 'destructive',
                            handler: confirmDelete
                        }
                    ]}
                />

                {/* Edit Modal */}
                <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)} className="edit-review-modal">
                    <div className="edit-modal-content">
                        <div className="edit-modal-header">
                            <h2>Edit Review</h2>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>
                                <IonIcon icon={close} />
                            </button>
                        </div>

                        {editingReview && (
                            <>
                                <div className="edit-restaurant-info">
                                    <img src={editingReview.restaurantImage} alt={editingReview.restaurantName} />
                                    <span>{editingReview.restaurantName}</span>
                                </div>

                                <div className="edit-rating-section">
                                    <label>Your Rating</label>
                                    <div className="edit-stars">
                                        {renderStars(editRating, true)}
                                    </div>
                                </div>

                                <div className="edit-text-section">
                                    <label>Your Review</label>
                                    <textarea
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        placeholder="Share your experience..."
                                        rows={5}
                                    />
                                </div>

                                <button className="save-edit-btn" onClick={saveEdit}>
                                    Save Changes
                                </button>
                            </>
                        )}
                    </div>
                </IonModal>
            </IonContent>
        </IonPage>
    )
}

export default MyReviewsPage
