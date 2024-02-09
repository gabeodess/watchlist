class User < ApplicationRecord
    has_secure_password

    def first_name
      email.split(/[^a-zA-Z]/).first
    end

    def as_json_v1
      as_json(only: [:id, :email])
    end
end
