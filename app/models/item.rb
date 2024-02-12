class Item < ApplicationRecord
  belongs_to :user
  belongs_to :production

  validates :user_id, {uniqueness: {scope: :production_id}}

  delegate :themoviedb_id, :title, :released_on, :type, :image_url, to: :production

  def as_json_v1
    as_json(only: [:id, :created_at], methods: [:themoviedb_id, :title, :released_on, :type, :image_url])
  end
end
