class User < ApplicationRecord
    has_secure_password

    has_many :items

    def first_name
      email.split(/[^a-zA-Z]/).first
    end

    def as_json_v1
      as_json(only: [:id, :email])
    end

    def list
      items.includes(:production).each_with_object({}) do |item, dictionary|
        dictionary[item.themoviedb_id] = item.as_json(:v1)
      end
    end
end
