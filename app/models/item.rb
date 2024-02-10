class Item < ApplicationRecord
  belongs_to :user
  belongs_to :production

  validates :user_id, {uniqueness: {scope: :production_id}}

  delegate :themoviedb_id, to: :production

  def as_json_v1
    as_json(only: [:id], methods: [:themoviedb_id])
  end
end
