# These assets are from Gems which aren't included in every page.
    # So they must be included here
    # instead of in the application.js and css manifests.
  #   config.assets.precompile += %w(a-gem.css a-gem.js b-gem.js)
  #
  #   # This block includes all js/css files, including gems,
  # # under: app/assets, vendor/assets, lib/assets
  # # and excluding partial files (e.g. "_file.sass")
  # config.assets.precompile << Proc.new { |path|
  #   if path =~ /\.(css|js)\z/
  #     full_path = Rails.application.assets.resolve(path).to_path
  #     asset_paths = %w( app/assets vendor/assets lib/assets)
  #     if (asset_paths.any? {|ap| full_path.include? ap}) &&
  #         !path.starts_with?('_')
  #       puts "\tIncluding: " + full_path
  #       true
  #     else
  #       puts "\tExcluding: " + full_path
  #       false
  #     end
  #   else
  #     false
  #   end
  # }
# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.precompile += %w( whiteboard.js )
Rails.application.config.assets.precompile += %w( goog.css )
Rails.application.config.assets.precompile += %w( whiteboard.css )
Rails.application.config.assets.precompile += %w( welcome.js )

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
