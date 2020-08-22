<Grid item sm={6} xs={12}>
  <FormControl component="fieldset" className={classes.textField}>
    <FormLabel component="legend">Premium Settings</FormLabel>
    <FormGroup>
      <Tooltip
        title="Premium unlocks unlimited swipes, profile boost, and profile recycling"
        aria-label="add"
      >
        <FormControlLabel
          control={
            <Switch
              disabled
              checked={this.state.premium}
              onChange={this.handleChange}
              name="premium"
            />
          }
          label="Premium Account"
        />
      </Tooltip>
      <FormHelperText error={errors.premium ? true : false}>
        {errors.premium}
      </FormHelperText>
      <Tooltip
        title="Cycle through previously disliked profiles when there are no new profiles available"
        aria-label="add"
      >
        <FormControlLabel
          control={
            <Switch
              checked={this.state.recycle}
              onChange={this.handleChange}
              name="recycle"
            />
          }
          label="Recycle Profiles"
        />
      </Tooltip>
      <FormHelperText error={errors.recycle ? true : false}>
        {errors.recycle}
      </FormHelperText>
      <Tooltip
        title="Boost your profile to be seen by more people"
        aria-label="add"
      >
        <FormControlLabel
          control={
            <Switch
              checked={this.state.boost}
              onChange={this.handleChange}
              name="boost"
            />
          }
          label="Boost Your Profile"
        />
      </Tooltip>
      <FormHelperText error={errors.boost ? true : false}>
        {errors.boost}
      </FormHelperText>
    </FormGroup>
  </FormControl>
</Grid>;
