package com.example.feedback.service;

/**
 * Service interface for content moderation functionality.
 * Provides methods to check for inappropriate content in text.
 */
public interface ContentModerationService {
    
    /**
     * Validates that the given text does not contain inappropriate content.
     * 
     * @param text the text to validate
     * @param operation the operation being performed (e.g., "create", "update")
     * @throws com.example.feedback.exception.ContentModerationException if inappropriate content is detected
     */
    void validateContent(String text, String operation);
    
    /**
     * Checks if the given text contains inappropriate content.
     * 
     * @param text the text to check
     * @return true if inappropriate content is detected, false otherwise
     */
    boolean containsInappropriateContent(String text);
    
    /**
     * Gets the first inappropriate word found in the text, if any.
     * 
     * @param text the text to check
     * @return the first inappropriate word found, or null if none found
     */
    String getFirstInappropriateWord(String text);
}